import { MigrationInterface, QueryRunner } from "typeorm";

export class StructuredDbUpdate1729667818971 implements MigrationInterface {
    name = 'StructuredDbUpdate1729667818971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_platform\` ADD \`lockedAt\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_platform\` DROP COLUMN \`lockedAt\``);
    }

}
