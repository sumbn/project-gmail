import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNameRow1726035286811 implements MigrationInterface {
    name = 'UpdateNameRow1726035286811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`phoneModel\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`phone_number\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`phone_model\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`phone_model\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`phoneNumber\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`phoneModel\` varchar(255) NOT NULL`);
    }

}
