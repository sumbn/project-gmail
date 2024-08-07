import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChangeNameTable1723012386538 implements MigrationInterface {
    name = 'AddChangeNameTable1723012386538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`first_name\` CHANGE \`firstName\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`last_name\` CHANGE \`lastName\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`first_name\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`first_name\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`last_name\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`last_name\` ADD \`name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`last_name\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`last_name\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`first_name\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`first_name\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`last_name\` CHANGE \`name\` \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`first_name\` CHANGE \`name\` \`firstName\` varchar(255) NOT NULL`);
    }

}
