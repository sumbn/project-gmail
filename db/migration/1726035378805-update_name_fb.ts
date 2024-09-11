import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNameFb1726035378805 implements MigrationInterface {
    name = 'UpdateNameFb1726035378805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`isFbChecked\` \`is_fb_checked\` tinyint NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`is_fb_checked\` \`isFbChecked\` tinyint NOT NULL DEFAULT '0'`);
    }

}
