import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCityInUser1743047946145 implements MigrationInterface {
    name = 'AddedCityInUser1743047946145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "city" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "city"`);
    }

}
