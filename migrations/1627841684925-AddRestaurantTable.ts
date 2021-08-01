import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRestaurantTable1627841684925 implements MigrationInterface {
  name = 'AddRestaurantTable21627841684925';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "restaurant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "zip_code" character varying(10) NOT NULL, "is_public" boolean NOT NULL, "owner_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "FK_fe7a22ecf454b7168b5a37fbdce" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "FK_fe7a22ecf454b7168b5a37fbdce"`,
    );
    await queryRunner.query(`DROP TABLE "restaurant"`);
  }
}
