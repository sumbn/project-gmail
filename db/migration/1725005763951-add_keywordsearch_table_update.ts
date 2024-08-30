import { MigrationInterface, QueryRunner } from "typeorm";

export class AddKeywordsearchTableUpdate1725005763951 implements MigrationInterface {
    name = 'AddKeywordsearchTableUpdate1725005763951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`key_word_search\` CHANGE \`password\` \`value\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`key_word_search\` DROP COLUMN \`value\``);
        await queryRunner.query(`ALTER TABLE \`key_word_search\` ADD \`value\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`key_word_search\` DROP COLUMN \`value\``);
        await queryRunner.query(`ALTER TABLE \`key_word_search\` ADD \`value\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`key_word_search\` CHANGE \`value\` \`password\` varchar(255) NOT NULL`);
    }

}
