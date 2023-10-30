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
Parada,
UbicacionConductor,
Conductor,
} from '../models';
import {ParadaRepository} from '../repositories';

export class ParadaConductorController {
  constructor(
    @repository(ParadaRepository) protected paradaRepository: ParadaRepository,
  ) { }

  @get('/paradas/{id}/conductors', {
    responses: {
      '200': {
        description: 'Array of Parada has many Conductor through UbicacionConductor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Conductor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Conductor>,
  ): Promise<Conductor[]> {
    return this.paradaRepository.paradaCercana(id).find(filter);
  }

  @post('/paradas/{id}/conductors', {
    responses: {
      '200': {
        description: 'create a Conductor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Conductor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Parada.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conductor, {
            title: 'NewConductorInParada',
            exclude: ['id'],
          }),
        },
      },
    }) conductor: Omit<Conductor, 'id'>,
  ): Promise<Conductor> {
    return this.paradaRepository.paradaCercana(id).create(conductor);
  }

  @patch('/paradas/{id}/conductors', {
    responses: {
      '200': {
        description: 'Parada.Conductor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conductor, {partial: true}),
        },
      },
    })
    conductor: Partial<Conductor>,
    @param.query.object('where', getWhereSchemaFor(Conductor)) where?: Where<Conductor>,
  ): Promise<Count> {
    return this.paradaRepository.paradaCercana(id).patch(conductor, where);
  }

  @del('/paradas/{id}/conductors', {
    responses: {
      '200': {
        description: 'Parada.Conductor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Conductor)) where?: Where<Conductor>,
  ): Promise<Count> {
    return this.paradaRepository.paradaCercana(id).delete(where);
  }
}
