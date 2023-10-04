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
  Distancias,
  Parada,
} from '../models';
import {DistanciasRepository} from '../repositories';

export class DistanciasParadaController {
  constructor(
    @repository(DistanciasRepository) protected distanciasRepository: DistanciasRepository,
  ) { }

  @get('/distancias/{id}/paradas', {
    responses: {
      '200': {
        description: 'Array of Distancias has many Parada',
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
    return this.distanciasRepository.parada(id).find(filter);
  }

  @post('/distancias/{id}/paradas', {
    responses: {
      '200': {
        description: 'Distancias model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parada)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Distancias.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parada, {
            title: 'NewParadaInDistancias',
            exclude: ['id'],
            optional: ['distanciasId']
          }),
        },
      },
    }) parada: Omit<Parada, 'id'>,
  ): Promise<Parada> {
    return this.distanciasRepository.parada(id).create(parada);
  }

  @patch('/distancias/{id}/paradas', {
    responses: {
      '200': {
        description: 'Distancias.Parada PATCH success count',
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
    return this.distanciasRepository.parada(id).patch(parada, where);
  }

  @del('/distancias/{id}/paradas', {
    responses: {
      '200': {
        description: 'Distancias.Parada DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Parada)) where?: Where<Parada>,
  ): Promise<Count> {
    return this.distanciasRepository.parada(id).delete(where);
  }
}
