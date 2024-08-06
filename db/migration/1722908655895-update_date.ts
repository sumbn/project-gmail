import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDate1722908655895 implements MigrationInterface {
    name = 'UpdateDate1722908655895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`created_at\``);
    }

}
