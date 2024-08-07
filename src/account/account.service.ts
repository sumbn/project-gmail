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

  /** generate object user  */

  genaraterUser = async () => {
    const firstName = (await this.repoFN.find()).map((fn) => fn.name);
    const lastName = (await this.repoLN.find()).map((ln) => ln.name);
    const address = (await this.repoAddress.find()).map((add) => add.address);
    const randomFN = this.getRandomElement(firstName);
    const randomLN = this.getRandomElement(lastName);
    const randomAdd = this.getRandomElement(address);
    const randomBirthday = this.getRandomBirthDate();
    const passwords = (await this.repoPass.find()).map((p) => p.password);
    const password = this.getRandomElement(passwords);

    return {
      name: randomFN + ' ' + randomLN,
      address: randomAdd,
      birth_day: randomBirthday,
      email: this.generateEmail(randomFN, randomLN, randomBirthday),
      password: password,
    };
  };

  private getRandomElement(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  private getRandomBirthDate(): string {
    const start = new Date(1990, 0, 1);
    const end = new Date(2002, 11, 31);
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
    const day = String(randomDate.getDate()).padStart(2, '0');
    const month = String(randomDate.getMonth() + 1).padStart(2, '0');
    const year = randomDate.getFullYear();
    return `${day}-${month}-${year}`;
  }
  private generateRandomEmail(
    firstName: string,
    lastName: string,
    address: string,
    birthDay: string,
  ): string {
    const birthDate = birthDay.replace(/-/g, '');
    const patterns = [
      `${firstName}${lastName}${address}${birthDate}`,
      `${lastName}${address}${birthDate}`,
      `${address}${lastName}${birthDate}`,
      `${address}${firstName}${lastName}${birthDate}`,
      `${firstName}${address}${birthDate}`,
    ];
    return this.getRandomElement(patterns);
  }
}
