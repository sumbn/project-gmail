import { MigrationInterface, QueryRunner } from "typeorm";

export class AddKeywordsearchTable1725005635610 implements MigrationInterface {
    name = 'AddKeywordsearchTable1725005635610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`key_word_search\` (\`id\` int NOT NULL AUTO_INCREMENT, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`key_word_search\``);
    }

}
