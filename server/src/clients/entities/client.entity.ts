import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
@ObjectType()
export class Client {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  phone: string;

  @OneToMany(() => Project, (project) => project.client)
  @Field(() => [Project], { nullable: true })
  projects: Project[];
}
