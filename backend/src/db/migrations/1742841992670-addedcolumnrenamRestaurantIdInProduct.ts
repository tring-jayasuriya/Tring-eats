import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedcolumnrenamRestaurantIdInProduct1742841992670 implements MigrationInterface {
    name = 'AddedcolumnrenamRestaurantIdInProduct1742841992670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_11a1d3b4f6f1c6630be3127391d"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "restaurantId" TO "restaurantid"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_b0552f011e1fd20c16a42a3caf0" FOREIGN KEY ("restaurantid") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_b0552f011e1fd20c16a42a3caf0"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "restaurantid" TO "restaurantId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_11a1d3b4f6f1c6630be3127391d" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
