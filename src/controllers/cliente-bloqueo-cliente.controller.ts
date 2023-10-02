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
  BloqueoCliente,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteBloqueoClienteController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/bloqueo-clientes', {
    responses: {
      '200': {
        description: 'Array of Cliente has many BloqueoCliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BloqueoCliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<BloqueoCliente>,
  ): Promise<BloqueoCliente[]> {
    return this.clienteRepository.bloqueoCliente(id).find(filter);
  }

  @post('/clientes/{id}/bloqueo-clientes', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(BloqueoCliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BloqueoCliente, {
            title: 'NewBloqueoClienteInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) bloqueoCliente: Omit<BloqueoCliente, 'id'>,
  ): Promise<BloqueoCliente> {
    return this.clienteRepository.bloqueoCliente(id).create(bloqueoCliente);
  }

  @patch('/clientes/{id}/bloqueo-clientes', {
    responses: {
      '200': {
        description: 'Cliente.BloqueoCliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BloqueoCliente, {partial: true}),
        },
      },
    })
    bloqueoCliente: Partial<BloqueoCliente>,
    @param.query.object('where', getWhereSchemaFor(BloqueoCliente)) where?: Where<BloqueoCliente>,
  ): Promise<Count> {
    return this.clienteRepository.bloqueoCliente(id).patch(bloqueoCliente, where);
  }

  @del('/clientes/{id}/bloqueo-clientes', {
    responses: {
      '200': {
        description: 'Cliente.BloqueoCliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BloqueoCliente)) where?: Where<BloqueoCliente>,
  ): Promise<Count> {
    return this.clienteRepository.bloqueoCliente(id).delete(where);
  }
}
