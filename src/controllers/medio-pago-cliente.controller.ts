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
  MedioPago,
  Cliente,
} from '../models';
import {MedioPagoRepository} from '../repositories';

export class MedioPagoClienteController {
  constructor(
    @repository(MedioPagoRepository) protected medioPagoRepository: MedioPagoRepository,
  ) { }

  @get('/medio-pagos/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of MedioPago has many Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.medioPagoRepository.cliente(id).find(filter);
  }

  @post('/medio-pagos/{id}/clientes', {
    responses: {
      '200': {
        description: 'MedioPago model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof MedioPago.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInMedioPago',
            exclude: ['id'],
            optional: ['medioPagoId']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.medioPagoRepository.cliente(id).create(cliente);
  }

  @patch('/medio-pagos/{id}/clientes', {
    responses: {
      '200': {
        description: 'MedioPago.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.medioPagoRepository.cliente(id).patch(cliente, where);
  }

  @del('/medio-pagos/{id}/clientes', {
    responses: {
      '200': {
        description: 'MedioPago.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.medioPagoRepository.cliente(id).delete(where);
  }
}
