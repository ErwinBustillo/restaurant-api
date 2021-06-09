import { EntityRepository, Repository } from 'typeorm';
import { PaginationDTO } from '../dtos/pagination.dto';
import { Vote } from '../entities/vote.entity';
@EntityRepository(Vote)
export class VoteRepository extends Repository<Vote> {
  async getVotes({ offset = 0, limit = 10 }: PaginationDTO, userId: string) {
    const [data, count] = await this.findAndCount({
      relations: ['restaurant'],
      where: {
        userId,
      },
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

  async createVote(voteInput: Partial<Vote>) {
    const vote = this.create({
      ...voteInput,
    });

    const voteCreated = await this.save(vote);
    return voteCreated;
  }

  getByUserAndRestaurant(userId: string, restaurantId: string) {
    return this.createQueryBuilder('vote')
      .where('vote.userId = :userId', { userId })
      .andWhere('vote.restaurantId = :restaurantId', { restaurantId })
      .getOne();
  }
}
