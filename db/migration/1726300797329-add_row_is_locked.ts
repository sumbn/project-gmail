import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRowIsLocked1726300797329 implements MigrationInterface {
    name = 'AddRowIsLocked1726300797329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`is_locked\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`locked_at\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`locked_at\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`is_locked\``);
    }

}
