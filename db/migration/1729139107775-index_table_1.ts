import { MigrationInterface, QueryRunner } from "typeorm";

export class IndexTable11729139107775 implements MigrationInterface {
    name = 'IndexTable11729139107775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_6c8f0ed848d6bf79e61e3d8117\` ON \`account\``);
        await queryRunner.query(`DROP INDEX \`IDX_86ffb24dd57adad2bfe61f55d0\` ON \`account\``);
        await queryRunner.query(`DROP INDEX \`IDX_9f12e8ffb17cc4b4deeadb9340\` ON \`account\``);
        await queryRunner.query(`DROP INDEX \`IDX_a3dcd8c00c192ab76ceafc6ff6\` ON \`account\``);
        await queryRunner.query(`DROP INDEX \`IDX_ab777f12e9dfd6e768f5afbb12\` ON \`account\``);
        await queryRunner.query(`DROP INDEX \`IDX_e4c54f6d09bdc0be195fdbe9d9\` ON \`account\``);
        await queryRunner.query(`CREATE INDEX \`idx_email\` ON \`account\` (\`email\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`idx_email\` ON \`account\``);
        await queryRunner.query(`CREATE INDEX \`IDX_e4c54f6d09bdc0be195fdbe9d9\` ON \`account\` (\`is_Live\`, \`is_verify\`, \`created_by\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_ab777f12e9dfd6e768f5afbb12\` ON \`account\` (\`is_verify\`, \`created_by\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_a3dcd8c00c192ab76ceafc6ff6\` ON \`account\` (\`is_verify\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_9f12e8ffb17cc4b4deeadb9340\` ON \`account\` (\`created_by\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_86ffb24dd57adad2bfe61f55d0\` ON \`account\` (\`is_Live\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_6c8f0ed848d6bf79e61e3d8117\` ON \`account\` (\`is_Live\`, \`created_by\`)`);
    }

}
