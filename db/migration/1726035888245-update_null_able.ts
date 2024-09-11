import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNullAble1726035888245 implements MigrationInterface {
    name = 'UpdateNullAble1726035888245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`phone_number\` \`phone_number\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`phone_model\` \`phone_model\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`created_by\` \`created_by\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`created_by\` \`created_by\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`phone_model\` \`phone_model\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`phone_number\` \`phone_number\` varchar(255) NOT NULL`);
    }

}
