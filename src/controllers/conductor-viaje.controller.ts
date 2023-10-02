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
  Viaje,
} from '../models';
import {ConductorRepository} from '../repositories';

export class ConductorViajeController {
  constructor(
    @repository(ConductorRepository) protected conductorRepository: ConductorRepository,
  ) { }

  @get('/conductors/{id}/viajes', {
    responses: {
      '200': {
        description: 'Array of Conductor has many Viaje',
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
    return this.conductorRepository.viaje(id).find(filter);
  }

  @post('/conductors/{id}/viajes', {
    responses: {
      '200': {
        description: 'Conductor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Viaje)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Conductor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Viaje, {
            title: 'NewViajeInConductor',
            exclude: ['id'],
            optional: ['conductorId']
          }),
        },
      },
    }) viaje: Omit<Viaje, 'id'>,
  ): Promise<Viaje> {
    return this.conductorRepository.viaje(id).create(viaje);
  }

  @patch('/conductors/{id}/viajes', {
    responses: {
      '200': {
        description: 'Conductor.Viaje PATCH success count',
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
    return this.conductorRepository.viaje(id).patch(viaje, where);
  }

  @del('/conductors/{id}/viajes', {
    responses: {
      '200': {
        description: 'Conductor.Viaje DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Viaje)) where?: Where<Viaje>,
  ): Promise<Count> {
    return this.conductorRepository.viaje(id).delete(where);
  }
}
