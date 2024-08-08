import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1723120421737 implements MigrationInterface {
    name = 'CreateTable1723120421737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`hot_mail\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`recovery_email\` varchar(255) NOT NULL, \`birth_day\` datetime NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`created_facebook\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`hot_mail\``);
    }

}
