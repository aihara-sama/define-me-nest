import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Link } from 'src/modules/links/entities/link.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Card {
  @Field(() => Int, { description: 'Card id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'Card title' })
  @Column({
    nullable: false,
  })
  title: string;

  @Field(() => String, { description: 'Card description' })
  @Column('text', {
    nullable: false,
  })
  description: string;

  @Field(() => String, { description: 'Card image path' })
  @Column({
    nullable: false,
    default: 'default-card.svg',
  })
  imageName: string;

  @Field(() => String, { description: 'Card category' })
  @Column({
    nullable: false,
  })
  category: string;

  @Field(() => [Link], { description: 'Card links' })
  @OneToMany(() => Link, (link) => link.card, {
    cascade: true,
  })
  links: Link[];
}
