import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotMail } from './entities/hotmail.entity';
import { Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const getEmails = require('./check-mail');

@Injectable()
export class HotmailService {
  constructor(
    @InjectRepository(HotMail) private repoHotmail: Repository<HotMail>,
  ) {}

  getMail() {
    return this.repoHotmail.findOne({ where: { fb: false } });
  }

  async checkMail(email: string, password: string) {
    try {
      const emails = await getEmails(email, password);
      if (emails.length > 0) {
        const lastEmail = emails[emails.length - 1];
        const otp = this.extractOtp(lastEmail);
        if (otp) {
          // console.log('Extracted OTP:', otp);
          return { otp: otp };
        } else {
          // console.log('No OTP found in the email.');
          return { message: 'No OTP found in the email' };
        }
      } else {
        // console.log('No emails found.');
        return { message: 'No emails found.' };
      }
    } catch (error) {
      // console.error('Error fetching emails:', error);
      throw new NotFoundException('email or password incorrect');
    }
  }

  private extractOtp(emailContent: string): string | null {
    const otpRegex = /\b\d{6}\b/;
    const match = emailContent.match(otpRegex);
    return match ? match[0] : null;
  }
}
