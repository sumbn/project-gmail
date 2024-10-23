import { MigrationInterface, QueryRunner } from "typeorm";

export class StructuredDb21729662042837 implements MigrationInterface {
    name = 'StructuredDb21729662042837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`account_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_4d258da1f4c854e589909d4260\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` ADD CONSTRAINT \`FK_208a4e706331540c34584998990\` FOREIGN KEY (\`userId\`) REFERENCES \`account_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` DROP FOREIGN KEY \`FK_208a4e706331540c34584998990\``);
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` DROP COLUMN \`userId\``);
        await queryRunner.query(`DROP INDEX \`IDX_4d258da1f4c854e589909d4260\` ON \`account_user\``);
        await queryRunner.query(`DROP TABLE \`account_user\``);
    }

}
