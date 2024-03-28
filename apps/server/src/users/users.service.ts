import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';

import {
  InjectDatabase,
  InferInjectEntityDatabase,
  InferSchemaOfDatabaseModel,
} from '../database';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class UsersService {
  private redis: Redis;

  constructor(
    @InjectDatabase('UserExportedSchema')
    private userModel: InferInjectEntityDatabase<'UserExportedSchema'>,

    private redisService: RedisService,
    private mailerService: MailerService,
  ) {
    this.redis = this.redisService.getClient();
  }

  async createRequestOnCreateUser(props: {
    email: string;
    name: string;
    age: number;
  }) {
    const code = '' + Math.floor(1000 + Math.random() * 9000);
    const payload = { ...props, code };

    await this.redis.set(props.email, JSON.stringify(payload), 'EX', 60 * 5);

    this.mailerService.sendCode({
      to: props.email,
      code,
    });
  }

  async acceptRequestOnCreateUser(props: { email: string; code: string }) {
    const storedPayload = await this.redisService.getClient().get(props.email);
    await this.redis.del(props.email);

    if (!storedPayload) {
      throw new Error('No request found for the email');
    }

    const parsedPayload = JSON.parse(storedPayload);

    if (parsedPayload.code !== props.code) {
      throw new Error('Invalid code');
    }

    ///

    const user = await this.userModel.create({
      name: parsedPayload.name,
      email: parsedPayload.email,
      age: parsedPayload.age,
    });

    const userJson: InferSchemaOfDatabaseModel<'UserExportedSchema'>['Interface'] =
      user.toJSON();

    return userJson;
  }
}
