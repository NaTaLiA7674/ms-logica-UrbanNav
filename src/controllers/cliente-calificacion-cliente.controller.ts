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
  CalificacionCliente,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteCalificacionClienteController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/calificacion-clientes', {
    responses: {
      '200': {
        description: 'Array of Cliente has many CalificacionCliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CalificacionCliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<CalificacionCliente>,
  ): Promise<CalificacionCliente[]> {
    return this.clienteRepository.calificacionCliente(id).find(filter);
  }

  @post('/clientes/{id}/calificacion-clientes', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(CalificacionCliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CalificacionCliente, {
            title: 'NewCalificacionClienteInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) calificacionCliente: Omit<CalificacionCliente, 'id'>,
  ): Promise<CalificacionCliente> {
    return this.clienteRepository.calificacionCliente(id).create(calificacionCliente);
  }

  @patch('/clientes/{id}/calificacion-clientes', {
    responses: {
      '200': {
        description: 'Cliente.CalificacionCliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CalificacionCliente, {partial: true}),
        },
      },
    })
    calificacionCliente: Partial<CalificacionCliente>,
    @param.query.object('where', getWhereSchemaFor(CalificacionCliente)) where?: Where<CalificacionCliente>,
  ): Promise<Count> {
    return this.clienteRepository.calificacionCliente(id).patch(calificacionCliente, where);
  }

  @del('/clientes/{id}/calificacion-clientes', {
    responses: {
      '200': {
        description: 'Cliente.CalificacionCliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CalificacionCliente)) where?: Where<CalificacionCliente>,
  ): Promise<Count> {
    return this.clienteRepository.calificacionCliente(id).delete(where);
  }
}
