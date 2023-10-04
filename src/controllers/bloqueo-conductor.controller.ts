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
import {BloqueoConductor} from '../models';
import {BloqueoConductorRepository} from '../repositories';

export class BloqueoConductorController {
  constructor(
    @repository(BloqueoConductorRepository)
    public bloqueoConductorRepository : BloqueoConductorRepository,
  ) {}

  @post('/bloqueo-conductor')
  @response(200, {
    description: 'BloqueoConductor model instance',
    content: {'application/json': {schema: getModelSchemaRef(BloqueoConductor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BloqueoConductor, {
            title: 'NewBloqueoConductor',
            exclude: ['id'],
          }),
        },
      },
    })
    bloqueoConductor: Omit<BloqueoConductor, 'id'>,
  ): Promise<BloqueoConductor> {
    return this.bloqueoConductorRepository.create(bloqueoConductor);
  }

  @get('/bloqueo-conductor/count')
  @response(200, {
    description: 'BloqueoConductor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BloqueoConductor) where?: Where<BloqueoConductor>,
  ): Promise<Count> {
    return this.bloqueoConductorRepository.count(where);
  }

  @get('/bloqueo-conductor')
  @response(200, {
    description: 'Array of BloqueoConductor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BloqueoConductor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BloqueoConductor) filter?: Filter<BloqueoConductor>,
  ): Promise<BloqueoConductor[]> {
    return this.bloqueoConductorRepository.find(filter);
  }

  @patch('/bloqueo-conductor')
  @response(200, {
    description: 'BloqueoConductor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BloqueoConductor, {partial: true}),
        },
      },
    })
    bloqueoConductor: BloqueoConductor,
    @param.where(BloqueoConductor) where?: Where<BloqueoConductor>,
  ): Promise<Count> {
    return this.bloqueoConductorRepository.updateAll(bloqueoConductor, where);
  }

  @get('/bloqueo-conductor/{id}')
  @response(200, {
    description: 'BloqueoConductor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BloqueoConductor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(BloqueoConductor, {exclude: 'where'}) filter?: FilterExcludingWhere<BloqueoConductor>
  ): Promise<BloqueoConductor> {
    return this.bloqueoConductorRepository.findById(id, filter);
  }

  @patch('/bloqueo-conductor/{id}')
  @response(204, {
    description: 'BloqueoConductor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BloqueoConductor, {partial: true}),
        },
      },
    })
    bloqueoConductor: BloqueoConductor,
  ): Promise<void> {
    await this.bloqueoConductorRepository.updateById(id, bloqueoConductor);
  }

  @put('/bloqueo-conductor/{id}')
  @response(204, {
    description: 'BloqueoConductor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bloqueoConductor: BloqueoConductor,
  ): Promise<void> {
    await this.bloqueoConductorRepository.replaceById(id, bloqueoConductor);
  }

  @del('/bloqueo-conductor/{id}')
  @response(204, {
    description: 'BloqueoConductor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bloqueoConductorRepository.deleteById(id);
  }
}