import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Link } from '../links/entities/link.entity';
import { CardsController } from './cards.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Link])],
  providers: [CardsService],
  controllers: [CardsController],
})
export class CardsModule {}
