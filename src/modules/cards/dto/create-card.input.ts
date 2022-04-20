import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';

@InputType()
export class CreateCardInput {
  @Field(() => String, { description: 'Card title' })
  @IsString()
  title: string;

  @Field(() => String, { description: 'Card description' })
  @IsString()
  description: string;

  @Field(() => String, { description: 'Card image name', nullable: true })
  @IsString()
  imageName: string;

  @Field(() => String, { description: 'Card category' })
  @IsString()
  category: string;

  @Field(() => [String], { description: 'Card links' })
  @IsArray()
  links: string[];
}
