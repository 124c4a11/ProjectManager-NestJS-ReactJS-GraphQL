import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Client } from 'src/clients/entities/client.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum ProjectStatus {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  COMPLETE = 'Complete',
}

registerEnumType(ProjectStatus, {
  name: 'ProjectStatus',
});

@Entity('projects')
@ObjectType()
export class Project {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  description: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.NOT_STARTED,
  })
  @Field(() => ProjectStatus)
  status: ProjectStatus;

  @Column()
  @Field(() => Int)
  clientId: number;

  @ManyToOne(() => Client, (client) => client.projects, { onDelete: 'CASCADE' })
  @Field(() => Client)
  client: Client;
}
