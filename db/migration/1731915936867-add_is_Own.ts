import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsOwn1731915936867 implements MigrationInterface {
    name = 'AddIsOwn1731915936867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` ADD \`isOwn\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` DROP COLUMN \`isOwn\``);
    }

}
