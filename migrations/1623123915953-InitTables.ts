import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTables1623123915953 implements MigrationInterface {
  name = 'InitTables1623123915953';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "user_gender_enum" AS ENUM('Male', 'Female', 'Other')`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "gender" "user_gender_enum" NOT NULL DEFAULT 'Other', "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "restaurant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "zip_code" character varying(10) NOT NULL, "is_public" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "owner_id" uuid, CONSTRAINT "REL_fe7a22ecf454b7168b5a37fbdc" UNIQUE ("owner_id"), CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "like" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "restaurant_id" uuid NOT NULL, CONSTRAINT "REL_4356ac2f9519c7404a2869f169" UNIQUE ("user_id"), CONSTRAINT "REL_5afc1ca0d91c38446f6b3e52f6" UNIQUE ("restaurant_id"), CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "FK_fe7a22ecf454b7168b5a37fbdce" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_4356ac2f9519c7404a2869f1691" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_5afc1ca0d91c38446f6b3e52f61" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_5afc1ca0d91c38446f6b3e52f61"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_4356ac2f9519c7404a2869f1691"`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "FK_fe7a22ecf454b7168b5a37fbdce"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "like"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "restaurant"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "user"`);
    await queryRunner.query(`DROP TYPE "user_gender_enum"`);
  }
}
