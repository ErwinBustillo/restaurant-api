import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { DatabaseSettings } from './ormconfig';
import { schema } from './config.schema';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: schema,
    }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProd = configService.get('NODE_ENV') === 'production';
        const dbSettings = new DatabaseSettings(configService);
        const ormConfig = dbSettings.getConfig();
        return {
          ...ormConfig,
          ssl: isProd,
          extra: {
            ssl: isProd ? { rejectUnauthorized: false } : null,
          },
          autoLoadEntities: true,
        };
      },
    }),
    RestaurantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
