import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AccountPlatform,
  AccountStatus,
  AccountUser,
  AccountUserPlatform,
} from './entities';

@Injectable()
export class AccountService {
  constructor(
    // private authService: AuthService,
    @InjectRepository(AccountPlatform) private platform: AccountPlatform,
    @InjectRepository(AccountStatus) private status: AccountStatus,
    @InjectRepository(AccountUser) private user: AccountUser,
    @InjectRepository(AccountUserPlatform)
    private userPlatform: AccountUserPlatform,
  ) {}

  // async register(registerDto: RegisterAccountDto): Promise<any> {
  //   return this.repo.save(registerDto);
  // }

  // async getMailToFeed() {
  //   const lockTimeout = new Date(Date.now() - 15 * 60 * 1000);

  //   const queryRunner = this.repo.manager.connection.createQueryRunner();
  //   await queryRunner.startTransaction();

  //   try {
  //     const count = await this.repo.count({
  //       where: [
  //         { isLocked: false },
  //         { isLocked: true, lockAt: LessThan(lockTimeout) },
  //       ],
  //     });

  //     if (count === 0) {
  //       await queryRunner.commitTransaction();
  //       return { message: 'No unchecked accounts available' };
  //     }

  //     const randomOffset = Math.floor(Math.random() * count);
  //     const randomAccounts = await this.repo.find({
  //       // where: { isLive: false },
  //       skip: randomOffset,
  //       take: 1,
  //     });

  //     if (!randomAccounts) {
  //       throw new Error('No account found'); // Kiểm tra nếu không tìm thấy bản ghi
  //     }

  //     randomAccounts[0].isLocked = true;
  //     randomAccounts[0].lockAt = new Date();
  //     await queryRunner.manager.save(randomAccounts);

  //     await queryRunner.commitTransaction();

  //     return randomAccounts;
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     throw error;
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  // async updateLive(id: number) {
  //   const account = await this.repo.findOneBy({ id });

  //   if (!account) {
  //     return { message: 'Account not found' };
  //   }

  //   // Cập nhật is_fb_checked = true và mở khóa
  //   account.isLocked = false;
  //   account.lockAt = null;
  //   await this.repo.save(account);

  //   return { message: 'Account checked successfully', account };
  // }

  // async findAll(query: FilterAccountDto): Promise<any> {
  //   const itemsPerPage = Number(query.items_per_page) || 50;
  //   const page = Number(query.page) || 1;
  //   const skip = (page - 1) * itemsPerPage;

  //   // const keyword = query.search || '';

  //   const [res, total] = await this.repo.findAndCount({
  //     order: { createdAt: 'ASC' },
  //     take: itemsPerPage,
  //     skip: skip,
  //     // select: ['id', 'email', 'password','password']
  //   });
  //   const lastPage = Math.ceil(total / itemsPerPage);
  //   const nextPage = page + 1 > lastPage ? null : page + 1;
  //   const prevPage = page - 1 < 1 ? null : page - 1;
  //   return {
  //     data: res,
  //     total,
  //     currentPage: page,
  //     nextPage,
  //     prevPage,
  //     lastPage,
  //   };
  // }

  // async paginationAndFilter(
  //   query: FilterAccountDto,
  //   token?: string,
  // ): Promise<PaginatedResult<GmailAccount>> {
  //   const itemsPerPage = Number(query.items_per_page) || 50;
  //   const page = Number(query.page) || 1;
  //   const skip = (page - 1) * itemsPerPage;

  //   const keyword = query.search ? query.search.trim() : '';

  //   const queryBuilder = this.repo.createQueryBuilder('account');

  //   if (keyword) {
  //     queryBuilder.where(
  //       'account.name LIKE :keyword OR account.email LIKE :keyword',
  //       {
  //         keyword: `%${keyword}%`,
  //       },
  //     );
  //   }

  //   const [res, total] = await queryBuilder
  //     .orderBy('account.createdAt', 'ASC')
  //     .take(itemsPerPage)
  //     .skip(skip)
  //     .getManyAndCount();

  //   const lastPage = Math.ceil(total / itemsPerPage);
  //   const nextPage = page + 1 > lastPage ? null : page + 1;
  //   const prevPage = page - 1 < 1 ? null : page - 1;

  //   return {
  //     data: res,
  //     total,
  //     currentPage: page,
  //     nextPage,
  //     prevPage,
  //     lastPage,
  //   };
  // }
}
