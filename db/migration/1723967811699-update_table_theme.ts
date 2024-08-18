import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableTheme1723967811699 implements MigrationInterface {
    name = 'UpdateTableTheme1723967811699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`theme\` ADD \`value\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`theme\` DROP COLUMN \`value\``);
    }

}
