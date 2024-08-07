import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChangeData1723011617527 implements MigrationInterface {
    name = 'AddChangeData1723011617527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`first_name\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`last_name\` (\`id\` int NOT NULL AUTO_INCREMENT, \`lastName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`last_name\``);
        await queryRunner.query(`DROP TABLE \`first_name\``);
    }

}
