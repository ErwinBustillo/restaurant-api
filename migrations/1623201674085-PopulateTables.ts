import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateTables1623201674085 implements MigrationInterface {
  name = 'PopulateTables1623201674085';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
       INSERT INTO "user" (id,first_name,last_name,gender,email,"password",created_at,updated_at) VALUES
       ('b242fe13-9a89-4f7e-a20a-dd5139236c28'::uuid,'Erwin','Bustillo','Male'::user_gender_enum::user_gender_enum,'erwin.bustillo@gmail.com','$2b$10$GxdgbLAjB6fo4OyQta.i5eVeiHuLk.wUIoRRvfOwVMLFZWwVjT6my','2021-06-08 15:03:34.190521','2021-06-08 15:03:34.190521'),
       ('f0c8d887-f113-4959-8fd0-b9b43dca2d94'::uuid,'Pedro','Alvarez','Male'::user_gender_enum::user_gender_enum,'p.alva@gmail.com','$2b$10$5h1G9PkhzuyMIZxrS9Xq2O.F1lPJvPgRh0MvfkXFRC91YkuDn/pam','2021-06-08 15:34:17.814332','2021-06-08 15:34:17.814332');
       `);

    await queryRunner.query(`
       INSERT INTO restaurant (id,"name",address,phone,zip_code,is_public,owner_id,created_at,updated_at) VALUES
       ('0272ab5e-808a-4867-8bb6-79748853e999'::uuid,'El corral','calle 61 # 45 -45','3202222','080012',true,'b242fe13-9a89-4f7e-a20a-dd5139236c28'::uuid,'2021-06-08 15:04:00.590427','2021-06-08 15:04:00.590427'),
       ('69b36251-2b19-4167-a69a-e60e5000090b'::uuid,'Cacerola','calle 61 # 45 -45','3202222','080012',true,'b242fe13-9a89-4f7e-a20a-dd5139236c28'::uuid,'2021-06-08 15:04:11.376973','2021-06-08 15:04:11.376973'),
       ('02fcc226-2f63-4637-8f90-9f7c5a5003d0'::uuid,'Le sopa gourmet','calle 61 # 45 -45','3202222','080012',false,'b242fe13-9a89-4f7e-a20a-dd5139236c28'::uuid,'2021-06-08 15:04:39.874083','2021-06-08 15:04:39.874083'),
       ('f6c38b9c-c913-4692-b28f-029c26c54696'::uuid,'X','calle 61 # 45 -45','3202222','080012',false,'b242fe13-9a89-4f7e-a20a-dd5139236c28'::uuid,'2021-06-08 15:05:18.014432','2021-06-08 15:05:18.014432'),
       ('4fb715b4-97bf-42c8-add3-9d89433df950'::uuid,'Y','calle 61 # 45 -45','3202222','080012',false,'b242fe13-9a89-4f7e-a20a-dd5139236c28'::uuid,'2021-06-08 15:05:22.095082','2021-06-08 15:05:22.095082'),
       ('1d36e63e-bff7-4b46-ab73-dce995b20aa3'::uuid,'A','calle 61 # 45 -45','3202222','080012',true,'b242fe13-9a89-4f7e-a20a-dd5139236c28'::uuid,'2021-06-08 15:05:54.969889','2021-06-08 15:05:54.969889'),
       ('47d0354e-a842-4d69-a7e7-a3dc277ed692'::uuid,'B','calle 61 # 45 -45','3202222','080012',true,'b242fe13-9a89-4f7e-a20a-dd5139236c28'::uuid,'2021-06-08 15:05:58.481059','2021-06-08 15:05:58.481059'),
       ('064b2173-b95e-4408-bbab-96a037123c08'::uuid,'C','calle 61 # 45 -45','3202222','080012',true,'b242fe13-9a89-4f7e-a20a-dd5139236c28'::uuid,'2021-06-08 15:06:02.353697','2021-06-08 15:06:02.353697'),
       ('97a7bb83-b4b8-4108-a518-52853d909912'::uuid,'D','calle 61 # 45 -45','3202222','080012',true,'b242fe13-9a89-4f7e-a20a-dd5139236c28'::uuid,'2021-06-08 15:06:05.427346','2021-06-08 15:06:05.427346'),
       ('9dd00856-fbd2-4507-b9ef-b2a5abef2e67'::uuid,'F','calle 61 # 45 -45','3202222','080012',true,'b242fe13-9a89-4f7e-a20a-dd5139236c28'::uuid,'2021-06-08 15:06:21.8107','2021-06-08 15:06:21.8107');
       `);

    await queryRunner.query(`
       INSERT INTO restaurant (id,"name",address,phone,zip_code,is_public,owner_id,created_at,updated_at) VALUES
	 ('0367e5af-1a97-4d1a-b341-80785dafeebf'::uuid,'G','calle 61 # 45 -45','3202222','080012',true,'b242fe13-9a89-4f7e-a20a-dd5139236c28'::uuid,'2021-06-08 15:06:24.894442','2021-06-08 15:06:24.894442'),
	 ('2da22ee3-789d-4141-93e4-a1f9f484fc8f'::uuid,'H','calle 61 # 45 -45','3202222','080012',true,'b242fe13-9a89-4f7e-a20a-dd5139236c28'::uuid,'2021-06-08 15:06:28.219559','2021-06-08 15:06:28.219559'),
	 ('2307fc57-a9c0-4be6-83e0-388b840d0ee0'::uuid,'I','calle 61 # 45 -45','3202222','080012',true,'b242fe13-9a89-4f7e-a20a-dd5139236c28'::uuid,'2021-06-08 15:06:31.169231','2021-06-08 15:06:31.169231'),
	 ('4beaf6ed-cba3-4f87-aaff-06e0630641cf'::uuid,'J','calle 61 # 45 -45','3202222','080012',true,'b242fe13-9a89-4f7e-a20a-dd5139236c28'::uuid,'2021-06-08 15:06:34.597726','2021-06-08 15:06:34.597726'),
	 ('f65d0e3c-3021-46e6-b96e-169846c7ecee'::uuid,'K','calle 61 # 45 -45','3202222','080012',true,'b242fe13-9a89-4f7e-a20a-dd5139236c28'::uuid,'2021-06-08 15:06:37.690284','2021-06-08 15:06:37.690284'),
	 ('8bc3a44a-4bf6-49bf-92ba-775015c89f64'::uuid,'Alva fast food','calle 70 # 45 - 60','3504562','080013',true,'f0c8d887-f113-4959-8fd0-b9b43dca2d94'::uuid,'2021-06-08 15:37:14.655163','2021-06-08 15:37:14.655163'),
	 ('28f47f89-ffaa-4872-a5ef-e5fd61f36c61'::uuid,'Alva fast food 2','calle 80 # 45 - 60','3504562','080013',false,'f0c8d887-f113-4959-8fd0-b9b43dca2d94'::uuid,'2021-06-08 15:37:28.496155','2021-06-08 15:37:28.496155');
       `);

    await queryRunner.query(`
     INSERT INTO vote (id,user_id,restaurant_id,created_at,updated_at) VALUES
	 ('63a37dbe-5961-4a28-b867-7072cba0cf6c'::uuid,'b242fe13-9a89-4f7e-a20a-dd5139236c28'::uuid,'0272ab5e-808a-4867-8bb6-79748853e999'::uuid,'2021-06-08 19:04:04.297963','2021-06-08 19:04:04.297963');
     `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE vote `);
    await queryRunner.query(`TRUNCATE restaurant`);
    await queryRunner.query(`TRUNCATE "user"`);
  }
}
