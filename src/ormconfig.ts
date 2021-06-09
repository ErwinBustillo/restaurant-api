import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

@Injectable()
export class DatabaseSettings {
  constructor(private readonly configService: ConfigService) {}

  public getConfig(): TypeOrmModuleOptions {
    const config: ConnectionOptions = {
      type: 'postgres',
      host: this.configService.get('DB_HOST'),
      port: parseInt(this.configService.get('DB_PORT')),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrationsRun:
        this.configService.get('RUN_MIGRATION') === 'TRUE' ? true : false,
      logging:
        this.configService.get('NODE_ENV') === 'production' ? false : true,
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: './migrations',
      },
    };
    return config;
  }
}
