import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MailerService {
  constructor(@Inject('MAILER') private readonly mailerClient: ClientProxy) {}

  async sendCode(props: { to: string; code: string }) {
    this.mailerClient.emit('send_code', props);
  }
}
