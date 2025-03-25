import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedcolumnisAvailableInProduct1742841307618 implements MigrationInterface {
    name = 'AddedcolumnisAvailableInProduct1742841307618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "isAvailable" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "isAvailable"`);
    }

}
