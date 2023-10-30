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
UbicacionConductor,
Parada,
} from '../models';
import {ConductorRepository} from '../repositories';

export class ConductorParadaController {
  constructor(
    @repository(ConductorRepository) protected conductorRepository: ConductorRepository,
  ) { }

  @get('/conductors/{id}/paradas', {
    responses: {
      '200': {
        description: 'Array of Conductor has many Parada through UbicacionConductor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parada)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Parada>,
  ): Promise<Parada[]> {
    return this.conductorRepository.paradaCercana(id).find(filter);
  }

  @post('/conductors/{id}/paradas', {
    responses: {
      '200': {
        description: 'create a Parada model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parada)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Conductor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parada, {
            title: 'NewParadaInConductor',
            exclude: ['id'],
          }),
        },
      },
    }) parada: Omit<Parada, 'id'>,
  ): Promise<Parada> {
    return this.conductorRepository.paradaCercana(id).create(parada);
  }

  @patch('/conductors/{id}/paradas', {
    responses: {
      '200': {
        description: 'Conductor.Parada PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parada, {partial: true}),
        },
      },
    })
    parada: Partial<Parada>,
    @param.query.object('where', getWhereSchemaFor(Parada)) where?: Where<Parada>,
  ): Promise<Count> {
    return this.conductorRepository.paradaCercana(id).patch(parada, where);
  }

  @del('/conductors/{id}/paradas', {
    responses: {
      '200': {
        description: 'Conductor.Parada DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Parada)) where?: Where<Parada>,
  ): Promise<Count> {
    return this.conductorRepository.paradaCercana(id).delete(where);
  }
}
