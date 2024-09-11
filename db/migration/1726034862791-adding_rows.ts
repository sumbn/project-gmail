import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingRows1726034862791 implements MigrationInterface {
    name = 'AddingRows1726034862791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`address\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`phoneNumber\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`phoneModel\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`created_by\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`isFbChecked\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`isFbChecked\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`created_by\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`phoneModel\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`isActive\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`address\` varchar(255) NOT NULL`);
    }

}
