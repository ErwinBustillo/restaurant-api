import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/gte-user.decorator';
import { CreateRestaurantDTO } from './dtos/create-restaurant.dto';
import { PaginationDTO } from './dtos/pagination.dto';
import { UpdateRestaurantDTO } from './dtos/update-restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
@UseGuards(AuthGuard('jwt'))
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Get('public')
  getPublic(@Query() { offset, limit }: PaginationDTO) {
    return this.restaurantService.getPublics({
      offset,
      limit,
    });
  }

  @Get('owned')
  getMyRestaurant(
    @Query() { offset, limit }: PaginationDTO,
    @GetUser() user: any,
  ) {
    return this.restaurantService.getPublics(
      {
        offset,
        limit,
      },
      user,
    );
  }

  @Get('liked')
  getLikedRestaurants(
    @Query() { offset, limit }: PaginationDTO,
    @GetUser() user: any,
  ) {
    return this.restaurantService.getLikedRestaurants(
      {
        offset,
        limit,
      },
      user,
    );
  }

  @Post()
  createRestaurant(
    @Body() createRestaurantInput: CreateRestaurantDTO,
    @GetUser() user: any,
  ) {
    return this.restaurantService.createRestaurant(createRestaurantInput, user);
  }

  @Put(':id')
  updateRestaurant(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateRestaurantInput: UpdateRestaurantDTO,
    @GetUser() user: any,
  ) {
    return this.restaurantService.updateRestaurant(
      id,
      updateRestaurantInput,
      user,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteRestaurant(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: any,
  ) {
    return await this.restaurantService.removeRestaurant(id, user);
  }

  @Patch('vote/:id')
  rankRestaurant(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: any,
  ) {
    return this.restaurantService.rankRestaurant(id, user);
  }
}
