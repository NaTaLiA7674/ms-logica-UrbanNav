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
  BloqueoConductor,
} from '../models';
import {ConductorRepository} from '../repositories';

export class ConductorBloqueoConductorController {
  constructor(
    @repository(ConductorRepository) protected conductorRepository: ConductorRepository,
  ) { }

  @get('/conductors/{id}/bloqueo-conductors', {
    responses: {
      '200': {
        description: 'Array of Conductor has many BloqueoConductor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BloqueoConductor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<BloqueoConductor>,
  ): Promise<BloqueoConductor[]> {
    return this.conductorRepository.bloqueoConductor(id).find(filter);
  }

  @post('/conductors/{id}/bloqueo-conductors', {
    responses: {
      '200': {
        description: 'Conductor model instance',
        content: {'application/json': {schema: getModelSchemaRef(BloqueoConductor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Conductor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BloqueoConductor, {
            title: 'NewBloqueoConductorInConductor',
            exclude: ['id'],
            optional: ['conductorId']
          }),
        },
      },
    }) bloqueoConductor: Omit<BloqueoConductor, 'id'>,
  ): Promise<BloqueoConductor> {
    return this.conductorRepository.bloqueoConductor(id).create(bloqueoConductor);
  }

  @patch('/conductors/{id}/bloqueo-conductors', {
    responses: {
      '200': {
        description: 'Conductor.BloqueoConductor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BloqueoConductor, {partial: true}),
        },
      },
    })
    bloqueoConductor: Partial<BloqueoConductor>,
    @param.query.object('where', getWhereSchemaFor(BloqueoConductor)) where?: Where<BloqueoConductor>,
  ): Promise<Count> {
    return this.conductorRepository.bloqueoConductor(id).patch(bloqueoConductor, where);
  }

  @del('/conductors/{id}/bloqueo-conductors', {
    responses: {
      '200': {
        description: 'Conductor.BloqueoConductor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BloqueoConductor)) where?: Where<BloqueoConductor>,
  ): Promise<Count> {
    return this.conductorRepository.bloqueoConductor(id).delete(where);
  }
}
