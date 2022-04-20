import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Category {
  @Field(() => Int, { description: 'Category id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'Category name' })
  @Column({
    nullable: false,
  })
  category: string;
}
