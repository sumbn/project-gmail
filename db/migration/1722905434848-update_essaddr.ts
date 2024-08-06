import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEssaddr1722905434848 implements MigrationInterface {
    name = 'UpdateEssaddr1722905434848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`address\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`address\``);
    }

}
