import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Card } from '../cards/entities/card.entity';
import { ISearch } from './interfaces/search.interface';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Card) private readonly searchRepo: Repository<Card>,
  ) {}
  async search(searchParams: ISearch): Promise<Card[]> {
    console.log({ searchParams });

    const cards = await this.searchRepo.find({
      where: [
        {
          title: Like(`%${searchParams.search}%`),
          category: Like(`%${searchParams.category}%`),
        },
        {
          category: Like(`%${searchParams.category}%`),
          description: Like(`%${searchParams.search}%`),
        },
      ],
      take: 20,
      order: {
        id: 'DESC',
      },
      skip: searchParams.offset,
    });
    console.log('Searching', { cards });
    return cards;
  }
}
