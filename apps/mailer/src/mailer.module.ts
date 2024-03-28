import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule as LibMailerModule } from '@nestjs-modules/mailer';

import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';

const handlebarsTemplatesPath = path.resolve(__dirname + '/templates');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        './envs/common.env',
        './envs/common/.local.env',
        './envs/mailer/.env',
        './envs/mailer/.local.env',
      ],
    }),
    LibMailerModule.forRootAsync({
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        /// Мне кажется, что всегда лучше передавать составной url, чем дробить его
        const mailerConfig = {
          host: configService.getOrThrow<string>('MAILER_HOST'),
          port: parseInt(configService.getOrThrow<string>('MAILER_PORT'), 10),
          username: configService.getOrThrow<string>('MAILER_USERNAME'),
          password: configService.getOrThrow<string>('MAILER_PASSWORD'),
        };

        return {
          transport: {
            host: mailerConfig.host,
            port: mailerConfig.port,
            secure: true,
            auth: {
              user: mailerConfig.username,
              pass: mailerConfig.password,
            },
          },
          defaults: {
            from: `"nest-auth" <${mailerConfig.username}>`,
          },
          template: {
            dir: handlebarsTemplatesPath,
            adapter: new HandlebarsAdapter(),
          },
        };
      },
    }),
  ],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
