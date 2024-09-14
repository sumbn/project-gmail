import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { LessThan, Repository } from 'typeorm';
import { RegisterAccountDto } from './dto/registerAccount.dto';

@Injectable()
export class AccountService {
  constructor(@InjectRepository(Account) private repo: Repository<Account>) {}

  async register(registerDto: RegisterAccountDto): Promise<Account> {
    return this.repo.save(registerDto);
  }

  async getMailToFeed() {
    const lockTimeout = new Date(Date.now() - 5 * 60 * 1000);

    const queryRunner = this.repo.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const uncheckedAccounts = await queryRunner.manager.find(Account, {
        where: [
          { isLive: false, isLocked: false },
          { isLive: false, lockAt: LessThan(lockTimeout) },
        ],
      });

      if (uncheckedAccounts.length === 0) {
        await queryRunner.commitTransaction();
        return { message: 'No unchecked accounts available' };
      }

      const randomAccount =
        uncheckedAccounts[Math.floor(Math.random() * uncheckedAccounts.length)];

      randomAccount.isLocked = true;
      randomAccount.lockAt = new Date();
      await queryRunner.manager.save(randomAccount);

      await queryRunner.commitTransaction();

      return randomAccount;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateLive(id: number) {
    const account = await this.repo.findOneBy({ id });

    if (!account) {
      return { message: 'Account not found' };
    }

    // Cập nhật is_fb_checked = true và mở khóa
    account.isLive = true;
    account.isLocked = false;
    account.lockAt = null;
    await this.repo.save(account);

    return { message: 'Account checked successfully', account };
  }

  async findAll(): Promise<Account[]> {
    return await this.repo.find();
  }
}
