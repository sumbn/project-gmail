import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeLogicEntity1731648981332 implements MigrationInterface {
    name = 'ChangeLogicEntity1731648981332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`account_status\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`platformId\` varchar(36) NULL, UNIQUE INDEX \`IDX_8cffbafaa28ef3e044ed4cc633\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account_platform\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(30) NOT NULL, UNIQUE INDEX \`IDX_ca77a56de0cffd63e2c496d877\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account_user\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account_user_platform\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`isLocked\` tinyint NOT NULL DEFAULT 0, \`lockedAt\` datetime NULL, \`userId\` varchar(36) NULL, \`platformId\` varchar(36) NULL, \`statusId\` varchar(36) NULL, INDEX \`IDX_4b50975fe5ea4228dd44553105\` (\`platformId\`), UNIQUE INDEX \`IDX_627eca4420f9694053a72617a6\` (\`username\`, \`platformId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`account_status\` ADD CONSTRAINT \`FK_517e75dcf3a846da2b475c6c4c7\` FOREIGN KEY (\`platformId\`) REFERENCES \`account_platform\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` ADD CONSTRAINT \`FK_208a4e706331540c34584998990\` FOREIGN KEY (\`userId\`) REFERENCES \`account_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` ADD CONSTRAINT \`FK_4b50975fe5ea4228dd44553105c\` FOREIGN KEY (\`platformId\`) REFERENCES \`account_platform\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` ADD CONSTRAINT \`FK_29de3e8e55f3da63cca041f48d4\` FOREIGN KEY (\`statusId\`) REFERENCES \`account_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` DROP FOREIGN KEY \`FK_29de3e8e55f3da63cca041f48d4\``);
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` DROP FOREIGN KEY \`FK_4b50975fe5ea4228dd44553105c\``);
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` DROP FOREIGN KEY \`FK_208a4e706331540c34584998990\``);
        await queryRunner.query(`ALTER TABLE \`account_status\` DROP FOREIGN KEY \`FK_517e75dcf3a846da2b475c6c4c7\``);
        await queryRunner.query(`DROP INDEX \`IDX_627eca4420f9694053a72617a6\` ON \`account_user_platform\``);
        await queryRunner.query(`DROP INDEX \`IDX_4b50975fe5ea4228dd44553105\` ON \`account_user_platform\``);
        await queryRunner.query(`DROP TABLE \`account_user_platform\``);
        await queryRunner.query(`DROP TABLE \`account_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_ca77a56de0cffd63e2c496d877\` ON \`account_platform\``);
        await queryRunner.query(`DROP TABLE \`account_platform\``);
        await queryRunner.query(`DROP INDEX \`IDX_8cffbafaa28ef3e044ed4cc633\` ON \`account_status\``);
        await queryRunner.query(`DROP TABLE \`account_status\``);
    }

}
