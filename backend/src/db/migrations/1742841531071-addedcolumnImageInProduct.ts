import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedcolumnImageInProduct1742841531071 implements MigrationInterface {
    name = 'AddedcolumnImageInProduct1742841531071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "image"`);
    }

}
