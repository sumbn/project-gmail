import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullablePass1731919101809 implements MigrationInterface {
    name = 'AddNullablePass1731919101809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` CHANGE \`password\` \`password\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_user_platform\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
    }

}
