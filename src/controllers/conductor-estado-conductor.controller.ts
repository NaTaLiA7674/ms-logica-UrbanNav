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
  EstadoConductor,
} from '../models';
import {ConductorRepository} from '../repositories';

export class ConductorEstadoConductorController {
  constructor(
    @repository(ConductorRepository) protected conductorRepository: ConductorRepository,
  ) { }

  @get('/conductors/{id}/estado-conductors', {
    responses: {
      '200': {
        description: 'Array of Conductor has many EstadoConductor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EstadoConductor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EstadoConductor>,
  ): Promise<EstadoConductor[]> {
    return this.conductorRepository.estadoConductor(id).find(filter);
  }

  @post('/conductors/{id}/estado-conductors', {
    responses: {
      '200': {
        description: 'Conductor model instance',
        content: {'application/json': {schema: getModelSchemaRef(EstadoConductor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Conductor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoConductor, {
            title: 'NewEstadoConductorInConductor',
            exclude: ['id'],
            optional: ['conductorId']
          }),
        },
      },
    }) estadoConductor: Omit<EstadoConductor, 'id'>,
  ): Promise<EstadoConductor> {
    return this.conductorRepository.estadoConductor(id).create(estadoConductor);
  }

  @patch('/conductors/{id}/estado-conductors', {
    responses: {
      '200': {
        description: 'Conductor.EstadoConductor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoConductor, {partial: true}),
        },
      },
    })
    estadoConductor: Partial<EstadoConductor>,
    @param.query.object('where', getWhereSchemaFor(EstadoConductor)) where?: Where<EstadoConductor>,
  ): Promise<Count> {
    return this.conductorRepository.estadoConductor(id).patch(estadoConductor, where);
  }

  @del('/conductors/{id}/estado-conductors', {
    responses: {
      '200': {
        description: 'Conductor.EstadoConductor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EstadoConductor)) where?: Where<EstadoConductor>,
  ): Promise<Count> {
    return this.conductorRepository.estadoConductor(id).delete(where);
  }
}
