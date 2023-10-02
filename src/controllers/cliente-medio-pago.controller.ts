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
  MedioPago,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteMedioPagoController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/medio-pagos', {
    responses: {
      '200': {
        description: 'Array of Cliente has many MedioPago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MedioPago)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MedioPago>,
  ): Promise<MedioPago[]> {
    return this.clienteRepository.medioPago(id).find(filter);
  }

  @post('/clientes/{id}/medio-pagos', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(MedioPago)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedioPago, {
            title: 'NewMedioPagoInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) medioPago: Omit<MedioPago, 'id'>,
  ): Promise<MedioPago> {
    return this.clienteRepository.medioPago(id).create(medioPago);
  }

  @patch('/clientes/{id}/medio-pagos', {
    responses: {
      '200': {
        description: 'Cliente.MedioPago PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedioPago, {partial: true}),
        },
      },
    })
    medioPago: Partial<MedioPago>,
    @param.query.object('where', getWhereSchemaFor(MedioPago)) where?: Where<MedioPago>,
  ): Promise<Count> {
    return this.clienteRepository.medioPago(id).patch(medioPago, where);
  }

  @del('/clientes/{id}/medio-pagos', {
    responses: {
      '200': {
        description: 'Cliente.MedioPago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MedioPago)) where?: Where<MedioPago>,
  ): Promise<Count> {
    return this.clienteRepository.medioPago(id).delete(where);
  }
}
