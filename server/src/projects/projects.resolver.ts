import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from 'src/clients/entities/client.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly clientsService: ClientsService,
  ) {}

  @Mutation(() => Project)
  createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ): Promise<Project> {
    return this.projectsService.create(createProjectInput);
  }

  @Query(() => Project, { name: 'project' })
  findOne(@Args({ name: 'id', type: () => ID }) id: number): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Query(() => [Project], { name: 'projects' })
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @ResolveField(() => Client, { name: 'client' })
  findOwner(@Parent() project: Project): Promise<Client> {
    return this.clientsService.findOne(project.clientId);
  }

  @Mutation(() => Project)
  deleteProject(
    @Args({ name: 'id', type: () => ID }) id: number,
  ): Promise<Project> {
    return this.projectsService.deleteOne(id);
  }

  @Mutation(() => Project)
  updateProject(
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ) {
    return this.projectsService.update(updateProjectInput);
  }
}
