import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Distancias} from '../models';
import {DistanciasRepository} from '../repositories';

export class DistanciasController {
  constructor(
    @repository(DistanciasRepository)
    public distanciasRepository : DistanciasRepository,
  ) {}

  @post('/distancias')
  @response(200, {
    description: 'Distancias model instance',
    content: {'application/json': {schema: getModelSchemaRef(Distancias)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distancias, {
            title: 'NewDistancias',
            exclude: ['id'],
          }),
        },
      },
    })
    distancias: Omit<Distancias, 'id'>,
  ): Promise<Distancias> {
    return this.distanciasRepository.create(distancias);
  }

  @get('/distancias/count')
  @response(200, {
    description: 'Distancias model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Distancias) where?: Where<Distancias>,
  ): Promise<Count> {
    return this.distanciasRepository.count(where);
  }

  @get('/distancias')
  @response(200, {
    description: 'Array of Distancias model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Distancias, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Distancias) filter?: Filter<Distancias>,
  ): Promise<Distancias[]> {
    return this.distanciasRepository.find(filter);
  }

  @patch('/distancias')
  @response(200, {
    description: 'Distancias PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distancias, {partial: true}),
        },
      },
    })
    distancias: Distancias,
    @param.where(Distancias) where?: Where<Distancias>,
  ): Promise<Count> {
    return this.distanciasRepository.updateAll(distancias, where);
  }

  @get('/distancias/{id}')
  @response(200, {
    description: 'Distancias model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Distancias, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Distancias, {exclude: 'where'}) filter?: FilterExcludingWhere<Distancias>
  ): Promise<Distancias> {
    return this.distanciasRepository.findById(id, filter);
  }

  @patch('/distancias/{id}')
  @response(204, {
    description: 'Distancias PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distancias, {partial: true}),
        },
      },
    })
    distancias: Distancias,
  ): Promise<void> {
    await this.distanciasRepository.updateById(id, distancias);
  }

  @put('/distancias/{id}')
  @response(204, {
    description: 'Distancias PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() distancias: Distancias,
  ): Promise<void> {
    await this.distanciasRepository.replaceById(id, distancias);
  }

  @del('/distancias/{id}')
  @response(204, {
    description: 'Distancias DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.distanciasRepository.deleteById(id);
  }
}
