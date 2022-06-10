import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  providers: [ProjectsService, ProjectsResolver],
  imports: [TypeOrmModule.forFeature([Project]), ClientsModule],
})
export class ProjectsModule {}
