import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedcolumnEmailInRestaurant1742840584986 implements MigrationInterface {
    name = 'AddedcolumnEmailInRestaurant1742840584986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "email"`);
    }

}
