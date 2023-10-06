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
  CalificacionConductor,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteCalificacionConductorController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/calificacion-conductors', {
    responses: {
      '200': {
        description: 'Array of Cliente has many CalificacionConductor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CalificacionConductor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<CalificacionConductor>,
  ): Promise<CalificacionConductor[]> {
    return this.clienteRepository.calificacionConductor(id).find(filter);
  }

  @post('/clientes/{id}/calificacion-conductors', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(CalificacionConductor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CalificacionConductor, {
            title: 'NewCalificacionConductorInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) calificacionConductor: Omit<CalificacionConductor, 'id'>,
  ): Promise<CalificacionConductor> {
    return this.clienteRepository.calificacionConductor(id).create(calificacionConductor);
  }

  @patch('/clientes/{id}/calificacion-conductors', {
    responses: {
      '200': {
        description: 'Cliente.CalificacionConductor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CalificacionConductor, {partial: true}),
        },
      },
    })
    calificacionConductor: Partial<CalificacionConductor>,
    @param.query.object('where', getWhereSchemaFor(CalificacionConductor)) where?: Where<CalificacionConductor>,
  ): Promise<Count> {
    return this.clienteRepository.calificacionConductor(id).patch(calificacionConductor, where);
  }

  @del('/clientes/{id}/calificacion-conductors', {
    responses: {
      '200': {
        description: 'Cliente.CalificacionConductor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CalificacionConductor)) where?: Where<CalificacionConductor>,
  ): Promise<Count> {
    return this.clienteRepository.calificacionConductor(id).delete(where);
  }
}
