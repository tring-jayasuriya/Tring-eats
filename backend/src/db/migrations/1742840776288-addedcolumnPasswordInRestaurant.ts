import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedcolumnPasswordInRestaurant1742840776288 implements MigrationInterface {
    name = 'AddedcolumnPasswordInRestaurant1742840776288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "password"`);
    }

}
