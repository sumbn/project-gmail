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
    const lockTimeout = new Date(Date.now() - 15 * 60 * 1000);

    const queryRunner = this.repo.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const count = await this.repo.count({
        where: [
          { isLive: false, isLocked: false }, // Tài khoản chưa bị khóa
          { isLive: false, isLocked: true, lockAt: LessThan(lockTimeout) }, // Tài khoản bị khóa quá 15 phút
        ],
      });

      if (count === 0) {
        await queryRunner.commitTransaction();
        return { message: 'No unchecked accounts available' };
      }

      const randomOffset = Math.floor(Math.random() * count);
      const randomAccounts = await this.repo.find({
        where: { isLive: false },
        skip: randomOffset,
        take: 1,
      });

      if (!randomAccounts) {
        throw new Error('No account found'); // Kiểm tra nếu không tìm thấy bản ghi
      }

      randomAccounts[0].isLocked = true;
      randomAccounts[0].lockAt = new Date();
      await queryRunner.manager.save(randomAccounts);

      await queryRunner.commitTransaction();

      return randomAccounts;
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
