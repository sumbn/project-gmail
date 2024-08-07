import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { Address, FirstName, LastName, Password } from './entities/data.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private repo: Repository<Account>,
    @InjectRepository(Address) private repoAddress: Repository<Address>,
    @InjectRepository(FirstName) private repoFN: Repository<FirstName>,
    @InjectRepository(LastName) private repoLN: Repository<LastName>,
    @InjectRepository(Password) private repoPass: Repository<Password>,
  ) {}

  async register(registerDto: RegisterDto): Promise<Account> {
    return this.repo.save(registerDto);
  }

  async getDataAndCombine(): Promise<string[]> {
    const addresses = await this.repoAddress.find();
    const firstNames = await this.repoFN.find();
    const lastNames = await this.repoLN.find();

    const combinedData = this.combineData(firstNames, lastNames, addresses);
    return combinedData;
  }

  private combineData(
    firstNames: FirstName[],
    lastNames: LastName[],
    addresses: Address[],
  ): string[] {
    const result: string[] = [];

    firstNames.forEach((firstName) => {
      lastNames.forEach((lastName) => {
        addresses.forEach((address) => {
          const email = this.generateEmail(
            firstName.name,
            lastName.name,
            address.address,
          );
          result.push(email);
        });
      });
    });

    return result;
  }

  private generateEmail(
    firstName: string,
    lastName: string,
    address: string,
  ): string {
    const elements = [firstName, lastName, address];
    const shuffledElements = this.shuffleArray(elements);
    const email = `${shuffledElements.join('')}@gmail.com`;
    return email;
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
