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
  Distancias,
} from '../models';
import {ParadaRepository} from '../repositories';

export class ParadaDistanciasController {
  constructor(
    @repository(ParadaRepository) protected paradaRepository: ParadaRepository,
  ) { }

  @get('/paradas/{id}/distancias', {
    responses: {
      '200': {
        description: 'Array of Parada has many Distancias',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Distancias)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Distancias>,
  ): Promise<Distancias[]> {
    return this.paradaRepository.distancia(id).find(filter);
  }

  @post('/paradas/{id}/distancias', {
    responses: {
      '200': {
        description: 'Parada model instance',
        content: {'application/json': {schema: getModelSchemaRef(Distancias)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Parada.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distancias, {
            title: 'NewDistanciasInParada',
            exclude: ['id'],
            optional: ['paradaId']
          }),
        },
      },
    }) distancias: Omit<Distancias, 'id'>,
  ): Promise<Distancias> {
    return this.paradaRepository.distancia(id).create(distancias);
  }

  @patch('/paradas/{id}/distancias', {
    responses: {
      '200': {
        description: 'Parada.Distancias PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distancias, {partial: true}),
        },
      },
    })
    distancias: Partial<Distancias>,
    @param.query.object('where', getWhereSchemaFor(Distancias)) where?: Where<Distancias>,
  ): Promise<Count> {
    return this.paradaRepository.distancia(id).patch(distancias, where);
  }

  @del('/paradas/{id}/distancias', {
    responses: {
      '200': {
        description: 'Parada.Distancias DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Distancias)) where?: Where<Distancias>,
  ): Promise<Count> {
    return this.paradaRepository.distancia(id).delete(where);
  }
}
