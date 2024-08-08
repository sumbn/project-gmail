import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnFacebook1723118465082 implements MigrationInterface {
    name = 'AddColumnFacebook1723118465082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hot_mail\` ADD \`created_facebook\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hot_mail\` DROP COLUMN \`created_facebook\``);
    }

}
