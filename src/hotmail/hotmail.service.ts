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
      return emails;
    } catch (error) {
      console.error('error');
    }
  }
}
