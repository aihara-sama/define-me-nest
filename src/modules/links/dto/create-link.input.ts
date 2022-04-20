import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLinkInput {
  @Field(() => String, { description: 'String url' })
  url: string;
}
