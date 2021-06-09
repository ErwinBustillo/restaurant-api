import { EntityRepository, Repository } from 'typeorm';
import { PaginationDTO } from '../dtos/pagination.dto';
import { Restaurant } from '../entities/restaurant.entity';
@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {
  async getRestaurants(
    { offset = 0, limit = 10 }: PaginationDTO,
    userId?: string,
  ) {
    let where: any = {};
    if (userId) {
      where.ownerId = userId;
    } else {
      where.isPublic = true;
    }

    const [data, count] = await this.findAndCount({
      where,
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: offset * limit,
    });

    const pages = Math.ceil(count / limit);
    return {
      totalRestaurants: count,
      currentPage: offset,
      totalPages: pages > 0 ? pages : 0,
      data,
    };
  }

  getById(id: string): Promise<Restaurant> {
    return this.createQueryBuilder().where('id = :id', { id }).getOne();
  }

  async createRestaurant(restaurantInput: Partial<Restaurant>) {
    const restaurant = this.create({
      ...restaurantInput,
    });

    const restaurantCreated = await this.save(restaurant);
    return restaurantCreated;
  }

  updateRestaurant(id: string, restaurantInput: Partial<Restaurant>) {
    return this.update({ id }, restaurantInput);
  }

  removeRestaurant(id: string): void {
    this.delete({ id });
  }
}
