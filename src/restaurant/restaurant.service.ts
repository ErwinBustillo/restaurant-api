import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { CreateRestaurantDTO } from './dtos/create-restaurant.dto';
import { PaginationDTO } from './dtos/pagination.dto';
import { UpdateRestaurantDTO } from './dtos/update-restaurant.dto';
import { PUBLIC } from './enums/public-enum';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { VoteRepository } from './repositories/vote.repository';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly voteRepository: VoteRepository,
  ) {}

  async getPublics(queryParams: PaginationDTO, user?: JwtPayload) {
    if (!user) {
      return this.restaurantRepository.getRestaurants(queryParams);
    }
    const { userId } = user;
    return this.restaurantRepository.getRestaurants(queryParams, userId);
  }

  async getLikedRestaurants(
    queryParams: PaginationDTO,
    { userId }: JwtPayload,
  ) {
    return this.voteRepository.getVotes(queryParams, userId);
  }

  async createRestaurant(payload: CreateRestaurantDTO, { userId }: JwtPayload) {
    const { isPublic, ...restaurantInput } = payload;

    const restaurant = this.restaurantRepository.create(restaurantInput);
    restaurant.isPublic = isPublic === PUBLIC.YES ? true : false;
    restaurant.ownerId = userId;
    const newRestaurant = await this.restaurantRepository.createRestaurant(
      restaurant,
    );

    return {
      message: 'Restaurant created!',
      id: newRestaurant.id,
      createdAt: newRestaurant.createdAt,
    };
  }

  async updateRestaurant(
    id: string,
    payload: UpdateRestaurantDTO,
    { userId }: JwtPayload,
  ) {
    if (Object.entries(payload).length === 0) {
      throw new BadRequestException('Not payload body found on the request');
    }
    const { isPublic, ...updateRestaurantInput } = payload;
    const restaurant = await this.canPerformRestaurantChanges(id, userId);

    const restaurantInput = this.restaurantRepository.create(
      updateRestaurantInput,
    );

    let isPublicRestaurant = null;
    if (isPublic) {
      isPublicRestaurant = isPublic === PUBLIC.YES ? true : false;
    }
    restaurantInput.isPublic = isPublicRestaurant ?? restaurant.isPublic;
    await this.restaurantRepository.updateRestaurant(id, restaurantInput);

    return {
      id,
      message: 'Restaurant updated with success!',
      updateAt: new Date(),
    };
  }

  async removeRestaurant(id: string, { userId }: JwtPayload) {
    await this.canPerformRestaurantChanges(id, userId);
    await this.restaurantRepository.removeRestaurant(id);
  }

  private async canPerformRestaurantChanges(
    restaurantId: string,
    userId: string,
  ) {
    const restaurant = await this.restaurantRepository.getById(restaurantId);
    if (!restaurant) {
      throw new NotFoundException(
        `Restaurant with id ${restaurantId} not found `,
      );
    }
    if (restaurant.ownerId !== userId) {
      throw new ForbiddenException(
        'User not allowed to delete this restaurant',
      );
    }

    return restaurant;
  }

  async rankRestaurant(id: string, { userId }: JwtPayload) {
    const restaurant = await this.restaurantRepository.getById(id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id ${id} not found`);
    }

    const vote = await this.voteRepository.getByUserAndRestaurant(
      userId,
      restaurant.id,
    );
    if (vote) {
      throw new ConflictException(
        'You can not vote twice for the same restaurant',
      );
    }

    const partialVote = this.voteRepository.create({
      userId,
      restaurantId: restaurant.id,
    });

    const restaurantVoteCreated = await this.voteRepository.createVote(
      partialVote,
    );
    return {
      message: `Vote for restaurant with ${partialVote.restaurantId} saved!`,
    };
  }
}
