import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexPlatformid1730880987285 implements MigrationInterface {
    name = 'AddIndexPlatformid1730880987285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`IDX_4b50975fe5ea4228dd44553105\` ON \`account_user_platform\` (\`platformId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_4b50975fe5ea4228dd44553105\` ON \`account_user_platform\``);
    }

}
