import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableTheme1723967489789 implements MigrationInterface {
    name = 'CreateTableTheme1723967489789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`data_gen\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('firstName', 'lastName') NOT NULL, \`value\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`theme\` (\`id\` int NOT NULL AUTO_INCREMENT, \`theme\` enum ('animal', 'planet', 'earth', 'tree', 'nature', 'sport', 'city', 'travel', 'hobby', 'job') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`theme\``);
        await queryRunner.query(`DROP TABLE \`data_gen\``);
    }

}
