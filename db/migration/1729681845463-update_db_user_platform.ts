import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDbUserPlatform1729681845463 implements MigrationInterface {
    name = 'UpdateDbUserPlatform1729681845463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_627eca4420f9694053a72617a6\` ON \`account_user_platform\` (\`username\`, \`platformId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_627eca4420f9694053a72617a6\` ON \`account_user_platform\``);
    }

}
