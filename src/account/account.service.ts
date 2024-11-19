import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericService } from '../common/mysql/base.service';
import {
  AccountPlatformDto,
  AccountStatusDto,
  PaginationAccountDto,
  RegisterAccountDto,
} from './dto';

import {
  AccountPlatform,
  AccountStatus,
  AccountUser,
  AccountUserPlatform,
} from './entities';
import { AccountUserService } from './service/accountUser.service';

@Injectable()
export class AccountService {
  private readonly platformService: GenericService<AccountPlatform>;
  private readonly statusService: GenericService<AccountStatus>;
  constructor(
    @InjectRepository(AccountUserPlatform)
    private readonly userPlatformRepository: Repository<AccountUserPlatform>,
    @InjectRepository(AccountUser)
    private readonly userRepository: Repository<AccountUser>,
    @InjectRepository(AccountPlatform)
    private readonly platformRepository: Repository<AccountPlatform>,
    @InjectRepository(AccountStatus)
    private readonly statusRepository: Repository<AccountStatus>,

    private readonly accountUserService: AccountUserService,
  ) {
    this.platformService = new GenericService(
      platformRepository,
      AccountPlatform,
    );
    this.statusService = new GenericService(statusRepository, AccountStatus);
  }

  async createUserPlatformAccount(
    data: Partial<RegisterAccountDto>,
  ): Promise<any> {
    const checkPlatform = this.platformService.findOne(
      data.platformId,
      AccountPlatformDto,
    );

    const checkStatus = this.statusService.findOne(
      data.statusId,
      AccountStatusDto,
    );

    const checkExistAccount = this.userPlatformRepository.findOne({
      where: { username: data.username, platform: { id: data.platformId } },
      relations: ['platform'],
    });

    const [platform, status, existingAccount] = await Promise.all([
      checkPlatform,
      checkStatus,
      checkExistAccount,
    ]);

    if (!platform) {
      throw new HttpException('Platform not found', HttpStatus.NOT_FOUND);
    }

    if (!status) {
      throw new HttpException('Status not found', HttpStatus.NOT_FOUND);
    }

    if (existingAccount) {
      throw new HttpException(
        'Username already exists on this platform',
        HttpStatus.CONFLICT,
      );
    }

    let userId: string;

    if (platform.name === 'gmail') {
      const newUser = await this.accountUserService.saveNewAccountUser();
      userId = newUser.id;
    } else {
      if (!data.email) {
        throw new HttpException('Email must not empty', HttpStatus.BAD_REQUEST);
      }

      const checkExistEmail = await this.userPlatformRepository.findOne({
        where: { username: data.email, platform: { name: 'gmail' } },
        relations: ['user', 'platform'],
      });

      if (checkExistEmail) {
        userId = checkExistEmail.user.id;
      } else {
        const newUser = await this.accountUserService.saveNewAccountUser();
        userId = newUser.id;
        const savedGmail = await this.userPlatformRepository.create({
          user: newUser,
          platform: { name: 'gmail' },
          username: data.email,
          status: { name: 'active' },
          isOwn: false,
        });

        await this.userPlatformRepository.save(savedGmail);
      }
    }

    const userPlatform = this.userPlatformRepository.create({
      user: { id: userId },
      platform: platform,
      username: data.username,
      password: data.password,
      status: status,
    });

    const saveData = await this.userPlatformRepository.save(userPlatform);

    return saveData;
  }

  async paginationAndFilter(params: PaginationAccountDto): Promise<any> {
    const page = Number(params.page) || 1;
    const itemsPerPage = Number(params.items_per_page) || 10;
    const platformId = params.platformId;

    const where: any = {};
    if (platformId) {
      where.platform = { id: platformId };
    }

    // Tính tổng số bản ghi trước
    const total = await this.userPlatformRepository.count({ where });
    const totalPages = Math.ceil(total / itemsPerPage);

    // Nếu page vượt quá số trang thực tế, set page = totalPages
    const adjustedPage = page > totalPages ? totalPages : page;

    const skip = (adjustedPage - 1) * itemsPerPage;

    const [data] = await this.userPlatformRepository.findAndCount({
      where,
      relations: ['platform', 'user', 'status'],
      skip,
      take: itemsPerPage,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      currentPage: adjustedPage,
      itemsPerPage,
      totalPages,
    };
  }

  // async paginationAndFilter(
  //   query: Partial<FilterAccountDto>,
  // ): Promise<PaginatedResult<any>> {
  //   const itemsPerPage = Number(query.items_per_page) || 50;
  //   const page = Number(query.page) || 1;
  //   const skip = (page - 1) * itemsPerPage;
  //   const keyword = query.search ? query.search.trim() : null;
  //   const platformId = query.platformId;

  //   if (platformId) {
  //     if (keyword) {
  //       queryBuilder.andWhere('account.platform.id = :platformId', {
  //         platformId,
  //       });
  //     } else {
  //       queryBuilder.where('account.platform.id = :platformId', { platformId });
  //     }
  //     // queryBuilder.leftJoinAndSelect('account.platform', 'platform');
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
