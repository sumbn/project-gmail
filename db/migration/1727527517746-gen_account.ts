import { MigrationInterface, QueryRunner } from "typeorm";

export class GenAccount1727527517746 implements MigrationInterface {
    name = 'GenAccount1727527517746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NULL, \`phone_model\` varchar(255) NULL, \`created_by\` varchar(255) NULL, \`is_Live\` tinyint NOT NULL DEFAULT 0, \`is_verify\` tinyint NOT NULL DEFAULT 0, \`recovery_mail\` varchar(255) NULL, \`is_locked\` tinyint NOT NULL DEFAULT 0, \`locked_at\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`account\``);
    }

}
