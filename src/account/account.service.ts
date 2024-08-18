import { Injectable } from '@nestjs/common';
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

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private repo: Repository<Account>,
    @InjectRepository(UserInfoGen) private UIGrepo: Repository<UserInfoGen>,
    @InjectRepository(Theme) private repoTheme: Repository<Theme>,
    @InjectRepository(Password) private repoPass: Repository<Password>,
  ) {}

  async register(registerDto: RegisterDto): Promise<Account> {
    return this.repo.save(registerDto);
  }

  /** generate object user  */
  getRandomTheme(): ThemeType {
    const themes = Object.values(ThemeType);
    const randomIndex = Math.floor(Math.random() * themes.length);
    return themes[randomIndex] as ThemeType;
  }

  // Hàm để tạo username tương tự như logic Python
  async generateUsername(): Promise<string> {
    // Tạo số ngẫu nhiên từ 3 đến 5 chữ số
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

    // Chọn các từ ngẫu nhiên từ các chủ đề khác nhau
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

    // Tạo định dạng giống email như trong hình
    const username = `${firstWord}${randomSuffix1}.${secondWord}_${thirdWord}${randomSuffix2}`;

    return username;
  }

  // Hàm capitalize giống như Python
  capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  async getDataRandomFromDB(
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

  genaraterUser = async () => {
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

    return {
      firstName: randomFN,
      lastName: randomLN,
      username: (await this.generateUsername()) + '@gmail.com',
      password: password.password,
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
}
