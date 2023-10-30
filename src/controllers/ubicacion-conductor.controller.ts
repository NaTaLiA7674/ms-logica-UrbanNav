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
import {UbicacionConductor} from '../models';
import {UbicacionConductorRepository} from '../repositories';

export class UbicacionConductorController {
  constructor(
    @repository(UbicacionConductorRepository)
    public ubicacionConductorRepository : UbicacionConductorRepository,
  ) {}

  @post('/ubicacion-conductor')
  @response(200, {
    description: 'UbicacionConductor model instance',
    content: {'application/json': {schema: getModelSchemaRef(UbicacionConductor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UbicacionConductor, {
            title: 'NewUbicacionConductor',
            exclude: ['id'],
          }),
        },
      },
    })
    ubicacionConductor: Omit<UbicacionConductor, 'id'>,
  ): Promise<UbicacionConductor> {
    return this.ubicacionConductorRepository.create(ubicacionConductor);
  }

  @get('/ubicacion-conductor/count')
  @response(200, {
    description: 'UbicacionConductor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UbicacionConductor) where?: Where<UbicacionConductor>,
  ): Promise<Count> {
    return this.ubicacionConductorRepository.count(where);
  }

  @get('/ubicacion-conductor')
  @response(200, {
    description: 'Array of UbicacionConductor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UbicacionConductor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UbicacionConductor) filter?: Filter<UbicacionConductor>,
  ): Promise<UbicacionConductor[]> {
    return this.ubicacionConductorRepository.find(filter);
  }

  @patch('/ubicacion-conductor')
  @response(200, {
    description: 'UbicacionConductor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UbicacionConductor, {partial: true}),
        },
      },
    })
    ubicacionConductor: UbicacionConductor,
    @param.where(UbicacionConductor) where?: Where<UbicacionConductor>,
  ): Promise<Count> {
    return this.ubicacionConductorRepository.updateAll(ubicacionConductor, where);
  }

  @get('/ubicacion-conductor/{id}')
  @response(200, {
    description: 'UbicacionConductor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UbicacionConductor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UbicacionConductor, {exclude: 'where'}) filter?: FilterExcludingWhere<UbicacionConductor>
  ): Promise<UbicacionConductor> {
    return this.ubicacionConductorRepository.findById(id, filter);
  }

  @patch('/ubicacion-conductor/{id}')
  @response(204, {
    description: 'UbicacionConductor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UbicacionConductor, {partial: true}),
        },
      },
    })
    ubicacionConductor: UbicacionConductor,
  ): Promise<void> {
    await this.ubicacionConductorRepository.updateById(id, ubicacionConductor);
  }

  @put('/ubicacion-conductor/{id}')
  @response(204, {
    description: 'UbicacionConductor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ubicacionConductor: UbicacionConductor,
  ): Promise<void> {
    await this.ubicacionConductorRepository.replaceById(id, ubicacionConductor);
  }

  @del('/ubicacion-conductor/{id}')
  @response(204, {
    description: 'UbicacionConductor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ubicacionConductorRepository.deleteById(id);
  }
}
