import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientInput } from './dto/create-client.input';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>,
  ) {}

  async create(createClientInput: CreateClientInput): Promise<Client> {
    const client = await this.clientRepo.create(createClientInput);

    return await this.clientRepo.save(client);
  }

  async findOne(id: number): Promise<Client> {
    return await this.clientRepo.findOneByOrFail({ id });
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepo.find();
  }

  async deleteOne(id: number): Promise<Client> {
    const client = await this.findOne(id);

    return await this.clientRepo.remove(client);
  }
}
