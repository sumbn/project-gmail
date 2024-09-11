import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRowVerify1726036820715 implements MigrationInterface {
    name = 'AddRowVerify1726036820715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`is_verify\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`is_verify\``);
    }

}
