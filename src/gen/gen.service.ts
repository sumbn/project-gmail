import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HotMail } from '../hotmail/entities/hotmail.entity';
import {
  KeyWordSearch,
  Password,
  RandomValueType,
  Theme,
  ThemeType,
  UserInfoGen,
} from './entities/data.entity';
import { JunkGmail } from './entities/junkGmail.entity';

@Injectable()
export class GenService {
  constructor(
    @InjectRepository(UserInfoGen) private UIGrepo: Repository<UserInfoGen>,
    @InjectRepository(Theme) private repoTheme: Repository<Theme>,
    @InjectRepository(Password) private repoPass: Repository<Password>,
    @InjectRepository(HotMail) private repoHotmail: Repository<HotMail>,
    @InjectRepository(KeyWordSearch) private repoKWS: Repository<KeyWordSearch>,
    @InjectRepository(JunkGmail) private repoJunkGmail: Repository<JunkGmail>,
  ) {}

  getRandomJunkGmail = async () => {
    return await this.repoJunkGmail
      .createQueryBuilder('email')
      .orderBy('RAND()')
      .limit(1)
      .getOne();
  };

  genKeyWordSearch = async () => {
    return await this.repoKWS
      .createQueryBuilder('value')
      .orderBy('RAND()')
      .limit(1)
      .getOne();
  };

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
      .orderBy('RAND()')
      .limit(1)
      .getOne();

    const randomMail = await this.getDataRandomNotCondition(
      this.repoHotmail,
      'hot_mail',
      'email',
    );

    const [dateOfBirth] = this.getRandomBirthDate();

    const email = await this.generateUsername();

    const randomNumber = Math.floor(Math.random() * 9999) + 1;

    const randomValue =
      this.yopMail[Math.floor(Math.random() * this.yopMail.length)];

    return {
      firstName: randomFN,
      lastName: randomLN,
      dateOfBirth: dateOfBirth,
      email: email,
      receiveMail: randomMail,
      password: password.password,
      recoveryMail: email + randomNumber + randomValue,
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

    const [dateOfBirth, birthDate] = this.getRandomBirthDate();

    const randomMail = await this.getDataRandomNotCondition(
      this.repoHotmail,
      'hot_mail',
      'email',
    );

    const email = this.generateRandomEmail(fn, ln, add, birthDate);

    const randomNumber = Math.floor(Math.random() * 9999) + 1;

    const randomValue =
      this.yopMail[Math.floor(Math.random() * this.yopMail.length)];
    return {
      firstName: fn,
      lastName: ln,
      address: add,
      dateOfBirth: dateOfBirth,
      email: email,
      receiveMail: randomMail,
      password: password.password,
      recoveryMail: email + randomNumber + randomValue,
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

    const [dateOfBirth, birthDate] = this.getRandomBirthDate();

    const email = this.generateRandomEmail(fn, ln, add, birthDate);

    const randomMail = await this.getDataRandomNotCondition(
      this.repoHotmail,
      'hot_mail',
      'email',
    );

    const randomNumber = Math.floor(Math.random() * 9999) + 1;

    const randomValue =
      this.yopMail[Math.floor(Math.random() * this.yopMail.length)];

    return {
      firstName: fn,
      lastName: ln,
      address: add,
      dateOfBirth: dateOfBirth,
      email: email,
      receiveMail: randomMail,
      password: password.password,
      recoveryMail: email + randomNumber + randomValue,
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

    const username = `${firstWord}${randomSuffix1}${secondWord}${thirdWord}${randomSuffix2}`;

    return username.length > 30 ? username.slice(0, 30) : username;
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
    return this.removeVietnameseTones(nomalize);
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

  private yopMail = [
    '@1xp.fr',
    '@cpc.cx',
    '@0cd.cn',
    '@prc.cx',
    '@b7s.ru',
    '@ab34.fr',
    '@e3b.org',
    '@ves.ink',
    '@q0.us.to',
    '@zx81.ovh',
    '@wishy.fr',
    '@bmn.ch.ma',
    '@iya.fr.nf',
    '@sdj.fr.nf',
    '@afw.fr.nf',
    '@mail34.fr',
    '@mynes.com',
    '@dao.pp.ua',
    '@nori24.tv',
    '@lerch.ovh',
    '@six25.biz',
    '@ywzmb.top',
    '@isep.fr.nf',
    '@noreply.fr',
    '@pliz.fr.nf',
    '@noyp.fr.nf',
    '@zouz.fr.nf',
    '@hunnur.com',
    '@wxcv.fr.nf',
    '@zorg.fr.nf',
    '@imap.fr.nf',
    '@redi.fr.nf',
    '@dlvr.us.to',
    '@y.iotf.net',
    '@zinc.fr.nf',
    '@ym.cypi.fr',
    '@yop.too.li',
    '@dmts.fr.nf',
    '@binich.com',
    '@wzofit.com',
    '@enpa.rf.gd',
    '@jmail.fr.nf',
    '@zimel.fr.cr',
    '@yaloo.fr.nf',
    '@jinva.fr.nf',
    '@ag.prout.be',
    '@ba.prout.be',
    '@es.prout.be',
    '@us.prout.be',
    '@ealea.fr.nf',
    '@nomes.fr.nf',
    '@yop.kd2.org',
    '@alves.fr.nf',
    '@bibi.biz.st',
    '@ymail.rr.nu',
    '@bboys.fr.nf',
    '@ma.ezua.com',
    '@ma.zyns.com',
    '@mai.25u.com',
    '@nomes.fr.cr',
    '@autre.fr.nf',
    '@lsyx0.rr.nu',
    '@tweet.fr.nf',
    '@pamil.1s.fr',
    '@pamil.fr.nf',
    '@ymail.1s.fr',
    '@15963.fr.nf',
    '@popol.fr.nf',
    '@pmail.1s.fr',
    '@flobo.fr.nf',
    '@toolbox.ovh',
    '@bin-ich.com',
    '@sindwir.com',
    '@mabal.fr.nf',
    '@degap.fr.nf',
    '@yop.uuii.in',
    '@jetable.org',
    '@a.kwtest.io',
    '@pasdus.fr.cr',
    '@gland.xxl.st',
    '@nospam.fr.nf',
    '@azeqsd.fr.nf',
    '@le.monchu.fr',
    '@nikora.fr.nf',
    '@sendos.fr.nf',
    '@mai.dhcp.biz',
    '@cubox.biz.st',
    '@fhpfhp.fr.nf',
    '@c-eric.fr.nf',
    '@c-eric.fr.cr',
    '@bahoo.biz.st',
    '@upc.infos.st',
    '@gggggg.fr.cr',
    '@spam.aleh.de',
    '@alphax.fr.nf',
    '@habenwir.com',
    '@ist-hier.com',
    '@sind-wir.com',
    '@sindhier.com',
    '@wir-sind.com',
    '@myself.fr.nf',
    '@yop.mabox.eu',
    '@vip.ep77.com',
    '@email.jjj.ee',
    '@druzik.pp.ua',
    '@flaimenet.ir',
    '@yahooz.xxl.st',
    '@tiscali.fr.cr',
    '@altrans.fr.nf',
    '@yoptruc.fr.nf',
    '@kyuusei.fr.nf',
    '@ac-cool.c4.fr',
    '@certexx.fr.nf',
    '@dede.infos.st',
    '@sake.prout.be',
    '@eureka.0rg.fr',
    '@yotmail.fr.nf',
    '@miloras.fr.nf',
    '@nikora.biz.st',
    '@cabiste.fr.nf',
    '@galaxim.fr.nf',
    '@fuppurge.info',
    '@doviaso.fr.cr',
    '@pitiful.pp.ua',
    '@ggmail.biz.st',
    '@dis.hopto.org',
    '@yop.kyriog.fr',
    '@icidroit.info',
    '@yop.mc-fly.be',
    '@spam.9001.ovh',
    '@tmp.x-lab.net',
    '@mail.hsmw.net',
    '@y.dldweb.info',
    '@haben-wir.com',
    '@sind-hier.com',
    '@adresse.fr.cr',
    '@temp.ig96.net',
    '@assurmail.net',
    '@yop.smeux.com',
    '@alyxgod.rf.gd',
    '@mailadresi.tk',
    '@aze.kwtest.io',
    '@mailbox.biz.st',
    '@elmail.4pu.com',
    '@carioca.biz.st',
    '@mickaben.fr.nf',
    '@mickaben.fr.cr',
    '@ac-malin.fr.nf',
    '@gimuemoa.fr.nf',
    '@woofidog.fr.nf',
    '@rygel.infos.st',
    '@cheznico.fr.cr',
    '@contact.biz.st',
    '@rapidefr.fr.nf',
    '@calendro.fr.nf',
    '@calima.asso.st',
    '@cobal.infos.st',
    '@terre.infos.st',
    '@imails.asso.st',
    '@warlus.asso.st',
    '@carnesa.biz.st',
    '@jackymel.xl.cx',
    '@mail.tbr.fr.nf',
    '@webstore.fr.nf',
    '@freemail.fr.cr',
    '@mr-email.fr.nf',
    '@abo-free.fr.nf',
    '@courrier.fr.cr',
    '@ymail.ploki.fr',
    '@mailsafe.fr.nf',
    '@mail.jab.fr.cr',
    '@testkkk.zik.dj',
    '@sirttest.us.to',
    '@yop.moolee.net',
    '@antispam.fr.nf',
    '@machen-wir.com',
    '@adresse.biz.st',
    '@poubelle.fr.nf',
    '@lacraffe.fr.nf',
    '@gladogmi.fr.nf',
    '@yopmail.ozm.fr',
    '@mail.yabes.ovh',
    '@totococo.fr.nf',
    '@miistermail.fr',
    '@yopmail.kro.kr',
    '@freemail.biz.st',
    '@skynet.infos.st',
    '@readmail.biz.st',
    '@frostmail.fr.nf',
    '@frostmail.fr.cr',
    '@pitimail.xxl.st',
    '@mickaben.biz.st',
    '@mickaben.xxl.st',
    '@internaut.us.to',
    '@askold.prout.be',
    '@poubelle-du.net',
    '@mondial.asso.st',
    '@randol.infos.st',
    '@himail.infos.st',
    '@sendos.infos.st',
    '@nidokela.biz.st',
    '@likeageek.fr.nf',
    '@mcdomaine.fr.nf',
    '@emaildark.fr.nf',
    '@mymail.ns01.biz',
    '@cookie007.fr.nf',
    '@tagara.infos.st',
    '@pokemons1.fr.nf',
    '@spam.quillet.eu',
    '@desfrenes.fr.nf',
    '@mymail.infos.st',
    '@mail.i-dork.com',
    '@mail.berwie.com',
    '@mesemails.fr.nf',
    '@dripzgaming.com',
    '@mymaildo.kro.kr',
    '@dann.mywire.org',
    '@mymailbox.xxl.st',
    '@mail.xstyled.net',
    '@dreamgreen.fr.nf',
    '@contact.infos.st',
    '@mess-mails.fr.nf',
    '@omicron.token.ro',
    '@torrent411.fr.nf',
    '@yop.tv-sante.com',
    '@test.inclick.net',
    '@ssi-bsn.infos.st',
    '@webclub.infos.st',
    '@addedbyjc.0rg.fr',
    '@vigilantkeep.net',
    '@actarus.infos.st',
    '@whatagarbage.com',
    '@yopmail.ploki.fr',
    '@test-infos.fr.nf',
    '@mail-mario.fr.nf',
    '@dispo.sebbcn.net',
    '@ym.digi-value.fr',
    '@adresse.infos.st',
    '@ypmail.sehier.fr',
    '@pixelgagnant.net',
    '@m.tartinemoi.com',
    '@suck.my-vigor.de',
    '@ggamess.42web.io',
    '@mail.nuox.eu.org',
    '@cool.fr.nf',
    '@courriel.fr.nf',
    '@jetable.fr.nf',
    '@mega.zik.dj',
    '@moncourrier.fr.nf',
    '@monemail.fr.nf',
    '@monmail.fr.nf',
    '@nomail.xl.cx',
    '@nospam.ze.tc',
    '@speed.1s.fr',
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
