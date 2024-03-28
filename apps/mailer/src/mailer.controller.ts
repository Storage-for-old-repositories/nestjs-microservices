import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('hello')
  sendHelloUser(@Body() props: { to: string }) {
    return this.mailerService.sendHelloMessage({
      to: props.to,
    });
  }

  @EventPattern('send_code')
  async handleSendCode(props: { to: string; code: string }) {
    await this.mailerService.sendCode(props);
  }
}
