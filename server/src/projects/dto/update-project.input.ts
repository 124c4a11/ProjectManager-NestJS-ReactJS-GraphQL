import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';
import { ProjectStatus } from '../entities/project.entity';

@InputType()
export class UpdateProjectInput {
  @IsNumberString()
  @IsNotEmpty()
  @Field(() => ID)
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
