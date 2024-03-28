import { Injectable } from '@nestjs/common';
import { MailerService as LibMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private mailerService: LibMailerService) {}

  async sendHelloMessage(props: { to: string }) {
    await this.mailerService.sendMail({
      to: props.to,
      subject: 'Testing Nest MailerModule ✔',
      text: `Hello ${props.to}!`,
      template: './user-hello.hbs',
      context: {
        user: props.to,
      },
    });
  }

  async sendCode(props: { to: string; code: string }) {
    await this.mailerService.sendMail({
      to: props.to,
      subject: 'Your code',
      text: `Hello ${props.to}! Your code is ${props.code}!`,
      template: './send-code.hbs',
      context: {
        code: props.code,
      },
    });
  }
}
