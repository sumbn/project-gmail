import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import {
  Password,
  RandomValueType,
  Theme,
  ThemeType,
  UserInfoGen,
} from './entities/data.entity';
import { HotMail } from '../hotmail/entities/hotmail.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private repo: Repository<Account>,
    @InjectRepository(UserInfoGen) private UIGrepo: Repository<UserInfoGen>,
    @InjectRepository(Theme) private repoTheme: Repository<Theme>,
    @InjectRepository(Password) private repoPass: Repository<Password>,
    @InjectRepository(HotMail) private repoHotmail: Repository<HotMail>,
  ) {}

  async register(registerDto: RegisterDto): Promise<Account> {
    return this.repo.save(registerDto);
  }

  genaraterUser() {
    const randomGen = Math.floor(Math.random() * 3);
    switch (randomGen) {
      case 0:
        return this.gen1();
      case 1:
        return this.gen2();
      case 2:
        return this.gen3();
      default:
        return new NotFoundException('error in metho genarater');
    }
  }

  gen1 = async () => {
    const randomFN = await this.getDataRandomFromDB(
      this.UIGrepo,
      'user_info_gen',
      'type',
      RandomValueType.FIRST_NAME,
    );
    const randomLN = await this.getDataRandomFromDB(
      this.UIGrepo,
      'user_info_gen',
      'type',
      RandomValueType.LAST_NAME,
    );
    const password = await this.repoPass
      .createQueryBuilder('password')
      .orderBy('RAND()') // MySQL
      .limit(1)
      .getOne();

    const randomMail = await this.getDataRandomNotCondition(
      this.repoHotmail,
      'hot_mail',
      'email',
    );

    const [dayOfBirth] = this.getRandomBirthDate();

    return {
      firstName: randomFN,
      lastName: randomLN,
      dayOfBirth,
      email: (await this.generateUsername()) + '@gmail.com',
      receiveMail: randomMail,
      password: password.password,
    };
  };

  gen2 = async () => {
    const fn = await this.getDataRandomFromDB(
      this.UIGrepo,
      'user_info_gen',
      'type',
      RandomValueType.FIRST_NAME,
    );
    const ln = await this.getDataRandomFromDB(
      this.UIGrepo,
      'user_info_gen',
      'type',
      RandomValueType.LAST_NAME,
    );

    const add = await this.getDataRandomFromDB(
      this.repoTheme,
      'theme',
      'theme',
      ThemeType.CITY,
    );
    const password = await this.repoPass
      .createQueryBuilder('password')
      .orderBy('RAND()') // MySQL
      .limit(1)
      .getOne();

    const [dayOfBirth, birthDate] = this.getRandomBirthDate();

    const randomMail = await this.getDataRandomNotCondition(
      this.repoHotmail,
      'hot_mail',
      'email',
    );

    const email = this.generateRandomEmail(fn, ln, add, birthDate);
    return {
      fn,
      ln,
      add,
      dayOfBirth,
      email,
      receiveMail: randomMail,
      password: password.password,
    };
  };

  gen3 = async () => {
    const fn = this.generateNamePartOpt3();
    const ln = this.generateNamePartOpt3();
    const add = await this.getDataRandomFromDB(
      this.repoTheme,
      'theme',
      'theme',
      ThemeType.CITY,
    );
    const password = await this.repoPass
      .createQueryBuilder('password')
      .orderBy('RAND()') // MySQL
      .limit(1)
      .getOne();

    const [dayOfBirth, birthDate] = this.getRandomBirthDate();

    const email = this.generateRandomEmail(fn, ln, add, birthDate);

    const randomMail = await this.getDataRandomNotCondition(
      this.repoHotmail,
      'hot_mail',
      'email',
    );

    return {
      fn,
      ln,
      add,
      dayOfBirth,
      email,
      receiveMail: randomMail,
      password: password.password,
    };
  };

  private getRandomTheme(): ThemeType {
    const themes = Object.values(ThemeType);
    const randomIndex = Math.floor(Math.random() * themes.length);
    return themes[randomIndex] as ThemeType;
  }

  private async generateUsername(): Promise<string> {
    const suffixLength = Math.floor(Math.random() * 3) + 3;
    const randomSuffix1 = Math.floor(
      Math.pow(10, suffixLength - 1) +
        Math.random() *
          (Math.pow(10, suffixLength) - Math.pow(10, suffixLength - 1)),
    );
    const randomSuffix2 = Math.floor(
      Math.pow(10, suffixLength - 1) +
        Math.random() *
          (Math.pow(10, suffixLength) - Math.pow(10, suffixLength - 1)),
    );

    const nameTheme1 = this.getRandomTheme();
    const firstWord = await this.getDataRandomFromDB(
      this.repoTheme,
      'theme',
      'theme',
      nameTheme1,
    );

    const nameTheme2 = this.getRandomTheme();
    const secondWord = await this.getDataRandomFromDB(
      this.repoTheme,
      'theme',
      'theme',
      nameTheme2,
    );

    const nameTheme3 = this.getRandomTheme();
    const thirdWord = await this.getDataRandomFromDB(
      this.repoTheme,
      'theme',
      'theme',
      nameTheme3,
    );

    const username = `${firstWord}${randomSuffix1}.${secondWord}_${thirdWord}${randomSuffix2}`;

    return username;
  }

  private capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  private async getDataRandomNotCondition(
    repo: Repository<any>,
    tableName: string,
    columnName: string,
  ): Promise<string | null> {
    const randomData = await repo
      .createQueryBuilder(tableName)
      .select(`${tableName}.${columnName}`) // Chọn cột email
      .orderBy('RAND()') // Lấy ngẫu nhiên
      .limit(1) // Giới hạn 1 bản ghi
      .getOne();

    return randomData?.[columnName] ?? null;
  }

  private async getDataRandomFromDB(
    repo: Repository<any>,
    tableName: string,
    columnName: string,
    columnValue: string,
  ): Promise<string> {
    const randomData = await repo
      .createQueryBuilder(tableName)
      .select(`${tableName}.value`)
      .where(`${tableName}.${columnName} = :columnValue`, { columnValue })
      .orderBy('RAND()')
      .limit(1)
      .getOne();

    return randomData?.value ?? null;
  }

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

  private removeVietnameseTones(str: string): string {
    str = str.replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, 'a');
    str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, 'e');
    str = str.replace(/i|í|ì|ỉ|ĩ|ị/g, 'i');
    str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, 'o');
    str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, 'u');
    str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y');
    str = str.replace(/đ/g, 'd');
    return str;
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
    const nomalize = this.normalizeString(selectedPattern);
    return this.removeVietnameseTones(nomalize) + '@gmail.com';
  }

  private characterPairs = [
    'An',
    'Be',
    'Ca',
    'De',
    'El',
    'Fa',
    'Ga',
    'Ha',
    'In',
    'Jo',
    'Ka',
    'Lu',
    'Ma',
    'Ne',
    'Os',
    'Pa',
    'Ra',
    'Sa',
    'Ta',
    'Vi',
    'Ze',
    'Al',
    'Ba',
    'Ce',
    'Di',
    'Em',
    'Fi',
    'Gi',
    'He',
    'Is',
    'Ju',
    'Ki',
    'La',
    'Mo',
    'No',
    'Ot',
    'Pi',
    'Ro',
    'Si',
    'Ti',
    'Va',
    'Zo',
    'Am',
    'Bo',
    'Cu',
    'Du',
    'En',
    'Fe',
    'Gu',
    'Hu',
    'Iv',
    'Lo',
    'Mi',
    'Ni',
    'Ol',
    'Po',
    'Ru',
    'Su',
    'Te',
    'Ve',
    'Zu',
    'Ar',
    'Br',
    'Ch',
    'Do',
    'Ed',
    'Fi',
    'Gr',
    'Hi',
    'Iv',
    'Ja',
    'Li',
    'Me',
    'Na',
    'Or',
    'Pa',
    'Re',
    'Se',
    'Ti',
    'Va',
    'Zo',
  ];

  private generateNamePartOpt3(): string {
    const numberOfParts = Math.floor(Math.random() * 2) + 2; // Randomly choose between 2 or 3 parts
    let name = '';

    for (let i = 0; i < numberOfParts; i++) {
      name += this.getRandomElement(this.characterPairs);
    }

    return name;
  }
}
