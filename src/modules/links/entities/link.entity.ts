import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Card } from 'src/modules/cards/entities/card.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Link {
  @Field(() => Int, { description: 'Link id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'Link url' })
  @Column({
    nullable: false,
  })
  url: string;

  @Field(() => Card, { description: 'Card' })
  @ManyToOne(() => Card, (card) => card.links, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  card: Card;
}
