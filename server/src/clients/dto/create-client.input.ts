import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

@InputType()
export class CreateClientInput {
  @IsString()
  @Field()
  readonly name: string;

  @IsEmail()
  @Field()
  readonly email: string;

  @IsPhoneNumber()
  @Field()
  readonly phone: string;
}
