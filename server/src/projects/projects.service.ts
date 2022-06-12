import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
  ) {}

  async create(createProjectInput: CreateProjectInput): Promise<Project> {
    const project = await this.projectRepo.create(createProjectInput);

    return await this.projectRepo.save(project);
  }

  async findOne(id: number): Promise<Project> {
    return await this.projectRepo.findOneByOrFail({ id });
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepo.find();
  }

  async deleteOne(id: number): Promise<Project> {
    const project: Project = await this.findOne(id);

    const deletedProject = await this.projectRepo.remove(project);

    return { ...deletedProject, id };
  }

  async update(updateProjectInput: UpdateProjectInput): Promise<Project> {
    const project = await this.findOne(updateProjectInput.id);

    return this.projectRepo.save({ ...project, ...updateProjectInput });
  }
}
