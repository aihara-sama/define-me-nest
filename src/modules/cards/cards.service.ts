import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from '../links/entities/link.entity';
import { CreateCardInput } from './dto/create-card.input';
import { UpdateCardInput } from './dto/update-card.input';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private cardsRepo: Repository<Card>,
    @InjectRepository(Link) private linksRepo: Repository<Link>,
  ) {}

  create(createCardInput: CreateCardInput) {
    const { links, ...cardParams } = createCardInput;

    // Card
    const card = this.cardsRepo.create({
      ...cardParams,
      links: links.map((link) =>
        this.linksRepo.create({
          url: link,
        }),
      ),
    });
    console.log({ card });

    return this.cardsRepo.save(card);
  }
  async findAll() {
    const cards = await this.cardsRepo.find({
      relations: ['links'],
    });
    console.log({ cards });

    return cards;
  }

  async findOne(id: number) {
    const card = await this.cardsRepo.findOne(id);
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    return card;
  }

  async update(id: number, updateCardInput: UpdateCardInput) {
    const { links, ...cardParams } = updateCardInput;

    const card = await this.cardsRepo.findOne(id, { select: ['id', 'links'] });
    if (!card) {
      throw new NotFoundException('Card not found');
    }

    return this.cardsRepo.save({
      ...card,
      ...cardParams,
      links: links.map((link) =>
        this.linksRepo.create({
          url: link,
        }),
      ),
    });
  }

  async remove(id: number) {
    const card = await this.cardsRepo.findOne(id);
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    return this.cardsRepo.remove(card);
  }
}
