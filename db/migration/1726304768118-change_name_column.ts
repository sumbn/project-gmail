import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeNameColumn1726304768118 implements MigrationInterface {
    name = 'ChangeNameColumn1726304768118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`is_fb_checked\` \`is_Live\` tinyint NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`is_Live\` \`is_fb_checked\` tinyint NOT NULL DEFAULT '0'`);
    }

}
