import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableJunkGmail1726211095841 implements MigrationInterface {
    name = 'AddTableJunkGmail1726211095841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`junk_gmail\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`junk_gmail\``);
    }

}
