import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ProjectStatus } from '../entities/project.entity';

@InputType()
export class CreateProjectInput {
  @IsString()
  @Field()
  readonly description: string;

  @IsEnum(ProjectStatus)
  @Field(() => ProjectStatus, { nullable: true })
  readonly status: ProjectStatus;

  @IsNumber()
  @Field(() => Int)
  readonly clientId: number;
}
