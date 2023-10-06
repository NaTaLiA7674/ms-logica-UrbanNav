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
  CalificacionConductor,
} from '../models';
import {ConductorRepository} from '../repositories';

export class ConductorCalificacionConductorController {
  constructor(
    @repository(ConductorRepository) protected conductorRepository: ConductorRepository,
  ) { }

  @get('/conductors/{id}/calificacion-conductors', {
    responses: {
      '200': {
        description: 'Array of Conductor has many CalificacionConductor',
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
    return this.conductorRepository.calificacionConductor(id).find(filter);
  }

  @post('/conductors/{id}/calificacion-conductors', {
    responses: {
      '200': {
        description: 'Conductor model instance',
        content: {'application/json': {schema: getModelSchemaRef(CalificacionConductor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Conductor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CalificacionConductor, {
            title: 'NewCalificacionConductorInConductor',
            exclude: ['id'],
            optional: ['conductorId']
          }),
        },
      },
    }) calificacionConductor: Omit<CalificacionConductor, 'id'>,
  ): Promise<CalificacionConductor> {
    return this.conductorRepository.calificacionConductor(id).create(calificacionConductor);
  }

  @patch('/conductors/{id}/calificacion-conductors', {
    responses: {
      '200': {
        description: 'Conductor.CalificacionConductor PATCH success count',
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
    return this.conductorRepository.calificacionConductor(id).patch(calificacionConductor, where);
  }

  @del('/conductors/{id}/calificacion-conductors', {
    responses: {
      '200': {
        description: 'Conductor.CalificacionConductor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CalificacionConductor)) where?: Where<CalificacionConductor>,
  ): Promise<Count> {
    return this.conductorRepository.calificacionConductor(id).delete(where);
  }
}
