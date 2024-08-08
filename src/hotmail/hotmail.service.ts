import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotMail } from './entities/hotmail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotmailService {
  constructor(
    @InjectRepository(HotMail) private repoHotmail: Repository<HotMail>,
  ) {}

  getMail() {
    return this.repoHotmail.findOne({ where: { fb: false } });
  }
}
