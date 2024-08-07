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
    const [randomBirthday, dateBirthday] = this.getRandomBirthDate();
    const passwords = (await this.repoPass.find()).map((p) => p.password);
    const password = this.getRandomElement(passwords);

    return {
      name: randomFN + ' ' + randomLN,
      address: randomAdd,
      birth_day: randomBirthday,
      email: this.generateRandomEmail(
        randomFN,
        randomLN,
        randomAdd,
        dateBirthday,
      ),
      password: password,
    };
  };

  private getRandomElement(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  private getRandomBirthDate(): [string, Date] {
    const start = new Date(1990, 0, 1);
    const end = new Date(2002, 11, 31);
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
    const day = String(randomDate.getDate()).padStart(2, '0');
    const month = String(randomDate.getMonth() + 1).padStart(2, '0');
    const year = randomDate.getFullYear();
    return [`${day}-${month}-${year}`, randomDate];
  }

  private getBirthDateFormats(date: Date): string[] {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const shortYear = String(year).slice(-2);

    return [
      `${day}${month}`,
      `${day}${month}${shortYear}`,
      shortYear,
      `${month}${shortYear}`,
      String(year),
    ];
  }

  private normalizeString(str: string): string {
    return str.replace(/\s+/g, '').toLowerCase();
  }

  private generateRandomEmail(
    firstName: string,
    lastName: string,
    address: string,
    birthDate: Date,
  ): string {
    const birthDateFormats = this.getBirthDateFormats(birthDate);

    const birthDatePattern = this.getRandomElement(birthDateFormats);
    const patterns = [
      `${firstName}${lastName}${address}${birthDatePattern}`,
      `${lastName}${address}${birthDatePattern}`,
      `${address}${lastName}${birthDatePattern}`,
      `${address}${firstName}${lastName}${birthDatePattern}`,
      `${firstName}${address}${birthDatePattern}`,
    ];
    const selectedPattern = this.getRandomElement(patterns);
    return this.normalizeString(selectedPattern) + '@gmail.com';
  }
}
