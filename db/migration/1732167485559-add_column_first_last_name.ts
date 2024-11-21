import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnFirstLastName1732167485559 implements MigrationInterface {
    name = 'AddColumnFirstLastName1732167485559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` ADD \`firstName\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` ADD \`lastName\` varchar(20) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` DROP COLUMN \`firstName\``);
    }

}
