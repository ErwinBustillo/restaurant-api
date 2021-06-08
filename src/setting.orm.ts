import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: './migrations',
  },
};

export = config;
