import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsNumberString, IsString } from 'class-validator';
import { ProjectStatus } from '../entities/project.entity';

@InputType()
export class CreateProjectInput {
  @IsString()
  @Field()
  readonly name: string;

  @IsString()
  @Field()
  readonly description: string;

  @IsEnum(ProjectStatus)
  @Field(() => ProjectStatus, { nullable: true })
  readonly status: ProjectStatus;

  @IsNumberString()
  @Field(() => ID)
  readonly clientId: number;
}
