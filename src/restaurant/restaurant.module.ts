import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { VoteRepository } from './repositories/vote.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantRepository, VoteRepository])],
  providers: [RestaurantService],
  controllers: [RestaurantController],
})
export class RestaurantModule {}
