import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { ProjectStatus } from '../entities/project.entity';

@InputType()
export class UpdateProjectInput {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  readonly id: number;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  readonly description: string;

  @IsEnum(ProjectStatus)
  @IsOptional()
  @Field(() => ProjectStatus, { nullable: true })
  readonly status: ProjectStatus;
}
