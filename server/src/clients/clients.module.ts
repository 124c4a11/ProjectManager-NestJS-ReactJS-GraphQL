import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsResolver } from './clients.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

@Module({
  providers: [ClientsService, ClientsResolver],
  imports: [TypeOrmModule.forFeature([Client])],
  exports: [ClientsService],
})
export class ClientsModule {}
