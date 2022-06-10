import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ClientsService } from './clients.service';
import { CreateClientInput } from './dto/create-client.input';
import { Client } from './entities/client.entity';

@Resolver(() => Client)
export class ClientsResolver {
  constructor(private readonly clientsService: ClientsService) {}

  @Mutation(() => Client)
  createClient(
    @Args('createClientInput') createClientInput: CreateClientInput,
  ): Promise<Client> {
    return this.clientsService.create(createClientInput);
  }

  @Query(() => Client, { name: 'client' })
  findOne(@Args('id') id: number): Promise<Client> {
    return this.clientsService.findOne(id);
  }

  @Query(() => [Client], { name: 'clients' })
  findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  @Mutation(() => Client)
  deleteClient(@Args('id') id: number): Promise<Client> {
    return this.clientsService.deleteOne(id);
  }
}
