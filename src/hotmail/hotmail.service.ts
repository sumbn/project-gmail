import { Injectable } from '@nestjs/common';
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

  async checkMail() {
    try {
      const emails = await getEmails();
      if (emails.length > 0) {
        const lastEmail = emails[emails.length - 1];
        const otp = this.extractOtp(lastEmail);
        if (otp) {
          // console.log('Extracted OTP:', otp);
          return otp;
        } else {
          // console.log('No OTP found in the email.');
          return null;
        }
      } else {
        // console.log('No emails found.');
        return null;
      }
    } catch (error) {
      // console.error('Error fetching emails:', error);
      throw new Error('Unable to fetch emails');
    }
  }

  private extractOtp(emailContent: string): string | null {
    const otpRegex = /\b\d{6}\b/; // Biểu thức chính quy để tìm chuỗi 6 chữ số
    const match = emailContent.match(otpRegex);
    return match ? match[0] : null; // Trả về mã OTP nếu tìm thấy, ngược lại trả về null
  }
}
