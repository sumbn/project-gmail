import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnPhone1732095245203 implements MigrationInterface {
    name = 'AddColumnPhone1732095245203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` ADD \`phone_model\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` ADD \`phone_id\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` ADD \`created_by\` varchar(30) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` DROP COLUMN \`created_by\``);
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` DROP COLUMN \`phone_id\``);
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` DROP COLUMN \`phone_model\``);
    }

}
