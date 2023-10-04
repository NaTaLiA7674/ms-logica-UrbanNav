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
import {EstadoViaje} from '../models';
import {EstadoViajeRepository} from '../repositories';

export class EstadoViajeController {
  constructor(
    @repository(EstadoViajeRepository)
    public estadoViajeRepository : EstadoViajeRepository,
  ) {}

  @post('/estado-viaje')
  @response(200, {
    description: 'EstadoViaje model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadoViaje)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoViaje, {
            title: 'NewEstadoViaje',
            exclude: ['id'],
          }),
        },
      },
    })
    estadoViaje: Omit<EstadoViaje, 'id'>,
  ): Promise<EstadoViaje> {
    return this.estadoViajeRepository.create(estadoViaje);
  }

  @get('/estado-viaje/count')
  @response(200, {
    description: 'EstadoViaje model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstadoViaje) where?: Where<EstadoViaje>,
  ): Promise<Count> {
    return this.estadoViajeRepository.count(where);
  }

  @get('/estado-viaje')
  @response(200, {
    description: 'Array of EstadoViaje model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadoViaje, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstadoViaje) filter?: Filter<EstadoViaje>,
  ): Promise<EstadoViaje[]> {
    return this.estadoViajeRepository.find(filter);
  }

  @patch('/estado-viaje')
  @response(200, {
    description: 'EstadoViaje PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoViaje, {partial: true}),
        },
      },
    })
    estadoViaje: EstadoViaje,
    @param.where(EstadoViaje) where?: Where<EstadoViaje>,
  ): Promise<Count> {
    return this.estadoViajeRepository.updateAll(estadoViaje, where);
  }

  @get('/estado-viaje/{id}')
  @response(200, {
    description: 'EstadoViaje model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadoViaje, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EstadoViaje, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadoViaje>
  ): Promise<EstadoViaje> {
    return this.estadoViajeRepository.findById(id, filter);
  }

  @patch('/estado-viaje/{id}')
  @response(204, {
    description: 'EstadoViaje PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoViaje, {partial: true}),
        },
      },
    })
    estadoViaje: EstadoViaje,
  ): Promise<void> {
    await this.estadoViajeRepository.updateById(id, estadoViaje);
  }

  @put('/estado-viaje/{id}')
  @response(204, {
    description: 'EstadoViaje PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() estadoViaje: EstadoViaje,
  ): Promise<void> {
    await this.estadoViajeRepository.replaceById(id, estadoViaje);
  }

  @del('/estado-viaje/{id}')
  @response(204, {
    description: 'EstadoViaje DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.estadoViajeRepository.deleteById(id);
  }
}
