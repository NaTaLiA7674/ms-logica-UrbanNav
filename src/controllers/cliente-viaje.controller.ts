import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cliente,
  Viaje,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteViajeController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/viajes', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Viaje',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Viaje)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Viaje>,
  ): Promise<Viaje[]> {
    return this.clienteRepository.viaje(id).find(filter);
  }

  @post('/clientes/{id}/viajes', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Viaje)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Viaje, {
            title: 'NewViajeInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) viaje: Omit<Viaje, 'id'>,
  ): Promise<Viaje> {
    return this.clienteRepository.viaje(id).create(viaje);
  }

  @patch('/clientes/{id}/viajes', {
    responses: {
      '200': {
        description: 'Cliente.Viaje PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Viaje, {partial: true}),
        },
      },
    })
    viaje: Partial<Viaje>,
    @param.query.object('where', getWhereSchemaFor(Viaje)) where?: Where<Viaje>,
  ): Promise<Count> {
    return this.clienteRepository.viaje(id).patch(viaje, where);
  }

  @del('/clientes/{id}/viajes', {
    responses: {
      '200': {
        description: 'Cliente.Viaje DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Viaje)) where?: Where<Viaje>,
  ): Promise<Count> {
    return this.clienteRepository.viaje(id).delete(where);
  }
}
