import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedOrderColumns1743153032328 implements MigrationInterface {
    name = 'AddedOrderColumns1743153032328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."order_paymentstatus_enum" AS ENUM('paid', 'unpaid')`);
        await queryRunner.query(`ALTER TABLE "order" ADD "paymentStatus" "public"."order_paymentstatus_enum" NOT NULL DEFAULT 'unpaid'`);
        await queryRunner.query(`CREATE TYPE "public"."order_orderstatus_enum" AS ENUM('pending', 'confirmed', 'cancelled')`);
        await queryRunner.query(`ALTER TABLE "order" ADD "orderStatus" "public"."order_orderstatus_enum" NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "orderStatus"`);
        await queryRunner.query(`DROP TYPE "public"."order_orderstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "paymentStatus"`);
        await queryRunner.query(`DROP TYPE "public"."order_paymentstatus_enum"`);
    }

}
