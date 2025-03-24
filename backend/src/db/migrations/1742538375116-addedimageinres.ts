import { MigrationInterface, QueryRunner } from "typeorm";

export class Addedimageinres1742538375116 implements MigrationInterface {
    name = 'Addedimageinres1742538375116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "image"`);
    }

}
