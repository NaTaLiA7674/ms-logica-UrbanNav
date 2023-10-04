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
import {EstadoConductor} from '../models';
import {EstadoConductorRepository} from '../repositories';

export class EstadoConductorController {
  constructor(
    @repository(EstadoConductorRepository)
    public estadoConductorRepository : EstadoConductorRepository,
  ) {}

  @post('/estado-conductor')
  @response(200, {
    description: 'EstadoConductor model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadoConductor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoConductor, {
            title: 'NewEstadoConductor',
            exclude: ['id'],
          }),
        },
      },
    })
    estadoConductor: Omit<EstadoConductor, 'id'>,
  ): Promise<EstadoConductor> {
    return this.estadoConductorRepository.create(estadoConductor);
  }

  @get('/estado-conductor/count')
  @response(200, {
    description: 'EstadoConductor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstadoConductor) where?: Where<EstadoConductor>,
  ): Promise<Count> {
    return this.estadoConductorRepository.count(where);
  }

  @get('/estado-conductor')
  @response(200, {
    description: 'Array of EstadoConductor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadoConductor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstadoConductor) filter?: Filter<EstadoConductor>,
  ): Promise<EstadoConductor[]> {
    return this.estadoConductorRepository.find(filter);
  }

  @patch('/estado-conductor')
  @response(200, {
    description: 'EstadoConductor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoConductor, {partial: true}),
        },
      },
    })
    estadoConductor: EstadoConductor,
    @param.where(EstadoConductor) where?: Where<EstadoConductor>,
  ): Promise<Count> {
    return this.estadoConductorRepository.updateAll(estadoConductor, where);
  }

  @get('/estado-conductor/{id}')
  @response(200, {
    description: 'EstadoConductor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadoConductor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EstadoConductor, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadoConductor>
  ): Promise<EstadoConductor> {
    return this.estadoConductorRepository.findById(id, filter);
  }

  @patch('/estado-conductor/{id}')
  @response(204, {
    description: 'EstadoConductor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoConductor, {partial: true}),
        },
      },
    })
    estadoConductor: EstadoConductor,
  ): Promise<void> {
    await this.estadoConductorRepository.updateById(id, estadoConductor);
  }

  @put('/estado-conductor/{id}')
  @response(204, {
    description: 'EstadoConductor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() estadoConductor: EstadoConductor,
  ): Promise<void> {
    await this.estadoConductorRepository.replaceById(id, estadoConductor);
  }

  @del('/estado-conductor/{id}')
  @response(204, {
    description: 'EstadoConductor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.estadoConductorRepository.deleteById(id);
  }
}
