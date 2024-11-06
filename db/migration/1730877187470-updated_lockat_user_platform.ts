import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedLockatUserPlatform1730877187470 implements MigrationInterface {
    name = 'UpdatedLockatUserPlatform1730877187470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_platform\` DROP COLUMN \`lockedAt\``);
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` ADD \`isLocked\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` ADD \`lockedAt\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` DROP COLUMN \`lockedAt\``);
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` DROP COLUMN \`isLocked\``);
        await queryRunner.query(`ALTER TABLE \`account_platform\` ADD \`lockedAt\` datetime NULL`);
    }

}
