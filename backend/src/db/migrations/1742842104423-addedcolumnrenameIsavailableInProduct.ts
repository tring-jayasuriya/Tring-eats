import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedcolumnrenameIsavailableInProduct1742842104423 implements MigrationInterface {
    name = 'AddedcolumnrenameIsavailableInProduct1742842104423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "isAvailable" TO "isavailable"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "isavailable" TO "isAvailable"`);
    }

}
