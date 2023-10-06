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
  Conductor,
  CalificacionCliente,
} from '../models';
import {ConductorRepository} from '../repositories';

export class ConductorCalificacionClienteController {
  constructor(
    @repository(ConductorRepository) protected conductorRepository: ConductorRepository,
  ) { }

  @get('/conductors/{id}/calificacion-clientes', {
    responses: {
      '200': {
        description: 'Array of Conductor has many CalificacionCliente',
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
    return this.conductorRepository.calificacionCliente(id).find(filter);
  }

  @post('/conductors/{id}/calificacion-clientes', {
    responses: {
      '200': {
        description: 'Conductor model instance',
        content: {'application/json': {schema: getModelSchemaRef(CalificacionCliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Conductor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CalificacionCliente, {
            title: 'NewCalificacionClienteInConductor',
            exclude: ['id'],
            optional: ['conductorId']
          }),
        },
      },
    }) calificacionCliente: Omit<CalificacionCliente, 'id'>,
  ): Promise<CalificacionCliente> {
    return this.conductorRepository.calificacionCliente(id).create(calificacionCliente);
  }

  @patch('/conductors/{id}/calificacion-clientes', {
    responses: {
      '200': {
        description: 'Conductor.CalificacionCliente PATCH success count',
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
    return this.conductorRepository.calificacionCliente(id).patch(calificacionCliente, where);
  }

  @del('/conductors/{id}/calificacion-clientes', {
    responses: {
      '200': {
        description: 'Conductor.CalificacionCliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CalificacionCliente)) where?: Where<CalificacionCliente>,
  ): Promise<Count> {
    return this.conductorRepository.calificacionCliente(id).delete(where);
  }
}
