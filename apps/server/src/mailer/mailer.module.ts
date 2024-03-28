import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { MailerService } from './mailer.service';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: 'MAILER',
          inject: [ConfigService],
          async useFactory(configService: ConfigService) {
            const eventBusRQM = {
              url: configService.getOrThrow('EVENT_BUS_RQM'),
            };

            return {
              transport: Transport.RMQ,
              options: {
                urls: [eventBusRQM.url],
                queue: 'mailer_queue',
              },
            };
          },
        },
      ],
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
