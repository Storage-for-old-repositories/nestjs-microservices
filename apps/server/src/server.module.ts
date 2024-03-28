import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { MailerModule } from './mailer/mailer.module';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        './envs/common.env',
        './envs/common/.local.env',
        './envs/server/.env',
        './envs/server/.local.env',
      ],
    }),
    DatabaseModule,
    UsersModule,
    MailerModule,
    RedisModule.forRootAsync({
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        const redisConfig = {
          url: configService.getOrThrow<string>('REDIS_URL'),
        };

        return {
          url: redisConfig.url,
        };
      },
    }),
  ],
})
export class ServerModule {}
