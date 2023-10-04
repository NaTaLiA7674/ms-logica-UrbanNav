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
import {CalificacionCliente} from '../models';
import {CalificacionClienteRepository} from '../repositories';

export class CalificacionClienteController {
  constructor(
    @repository(CalificacionClienteRepository)
    public calificacionClienteRepository : CalificacionClienteRepository,
  ) {}

  @post('/calificacion-cliente')
  @response(200, {
    description: 'CalificacionCliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(CalificacionCliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CalificacionCliente, {
            title: 'NewCalificacionCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    calificacionCliente: Omit<CalificacionCliente, 'id'>,
  ): Promise<CalificacionCliente> {
    return this.calificacionClienteRepository.create(calificacionCliente);
  }

  @get('/calificacion-cliente/count')
  @response(200, {
    description: 'CalificacionCliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CalificacionCliente) where?: Where<CalificacionCliente>,
  ): Promise<Count> {
    return this.calificacionClienteRepository.count(where);
  }

  @get('/calificacion-cliente')
  @response(200, {
    description: 'Array of CalificacionCliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CalificacionCliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CalificacionCliente) filter?: Filter<CalificacionCliente>,
  ): Promise<CalificacionCliente[]> {
    return this.calificacionClienteRepository.find(filter);
  }

  @patch('/calificacion-cliente')
  @response(200, {
    description: 'CalificacionCliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CalificacionCliente, {partial: true}),
        },
      },
    })
    calificacionCliente: CalificacionCliente,
    @param.where(CalificacionCliente) where?: Where<CalificacionCliente>,
  ): Promise<Count> {
    return this.calificacionClienteRepository.updateAll(calificacionCliente, where);
  }

  @get('/calificacion-cliente/{id}')
  @response(200, {
    description: 'CalificacionCliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CalificacionCliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CalificacionCliente, {exclude: 'where'}) filter?: FilterExcludingWhere<CalificacionCliente>
  ): Promise<CalificacionCliente> {
    return this.calificacionClienteRepository.findById(id, filter);
  }

  @patch('/calificacion-cliente/{id}')
  @response(204, {
    description: 'CalificacionCliente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CalificacionCliente, {partial: true}),
        },
      },
    })
    calificacionCliente: CalificacionCliente,
  ): Promise<void> {
    await this.calificacionClienteRepository.updateById(id, calificacionCliente);
  }

  @put('/calificacion-cliente/{id}')
  @response(204, {
    description: 'CalificacionCliente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() calificacionCliente: CalificacionCliente,
  ): Promise<void> {
    await this.calificacionClienteRepository.replaceById(id, calificacionCliente);
  }

  @del('/calificacion-cliente/{id}')
  @response(204, {
    description: 'CalificacionCliente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.calificacionClienteRepository.deleteById(id);
  }
}
