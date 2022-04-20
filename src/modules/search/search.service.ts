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
    const cards = await this.searchRepo.find({
      where: {
        title: Like(`%${searchParams.title}%`),
        category: Like(`%${searchParams.category}%`),
      },
    });
    console.log({ cards });
    return cards;
  }
}
