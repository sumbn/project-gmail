import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeLogicDb1723968033507 implements MigrationInterface {
    name = 'ChangeLogicDb1723968033507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_info_gen\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('firstName', 'lastName') NOT NULL, \`value\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user_info_gen\``);
    }

}
