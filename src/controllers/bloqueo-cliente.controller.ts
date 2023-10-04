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
import {BloqueoCliente} from '../models';
import {BloqueoClienteRepository} from '../repositories';

export class BloqueoClienteController {
  constructor(
    @repository(BloqueoClienteRepository)
    public bloqueoClienteRepository : BloqueoClienteRepository,
  ) {}

  @post('/bloqueo-cliente')
  @response(200, {
    description: 'BloqueoCliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(BloqueoCliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BloqueoCliente, {
            title: 'NewBloqueoCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    bloqueoCliente: Omit<BloqueoCliente, 'id'>,
  ): Promise<BloqueoCliente> {
    return this.bloqueoClienteRepository.create(bloqueoCliente);
  }

  @get('/bloqueo-cliente/count')
  @response(200, {
    description: 'BloqueoCliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BloqueoCliente) where?: Where<BloqueoCliente>,
  ): Promise<Count> {
    return this.bloqueoClienteRepository.count(where);
  }

  @get('/bloqueo-cliente')
  @response(200, {
    description: 'Array of BloqueoCliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BloqueoCliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BloqueoCliente) filter?: Filter<BloqueoCliente>,
  ): Promise<BloqueoCliente[]> {
    return this.bloqueoClienteRepository.find(filter);
  }

  @patch('/bloqueo-cliente')
  @response(200, {
    description: 'BloqueoCliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BloqueoCliente, {partial: true}),
        },
      },
    })
    bloqueoCliente: BloqueoCliente,
    @param.where(BloqueoCliente) where?: Where<BloqueoCliente>,
  ): Promise<Count> {
    return this.bloqueoClienteRepository.updateAll(bloqueoCliente, where);
  }

  @get('/bloqueo-cliente/{id}')
  @response(200, {
    description: 'BloqueoCliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BloqueoCliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(BloqueoCliente, {exclude: 'where'}) filter?: FilterExcludingWhere<BloqueoCliente>
  ): Promise<BloqueoCliente> {
    return this.bloqueoClienteRepository.findById(id, filter);
  }

  @patch('/bloqueo-cliente/{id}')
  @response(204, {
    description: 'BloqueoCliente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BloqueoCliente, {partial: true}),
        },
      },
    })
    bloqueoCliente: BloqueoCliente,
  ): Promise<void> {
    await this.bloqueoClienteRepository.updateById(id, bloqueoCliente);
  }

  @put('/bloqueo-cliente/{id}')
  @response(204, {
    description: 'BloqueoCliente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bloqueoCliente: BloqueoCliente,
  ): Promise<void> {
    await this.bloqueoClienteRepository.replaceById(id, bloqueoCliente);
  }

  @del('/bloqueo-cliente/{id}')
  @response(204, {
    description: 'BloqueoCliente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bloqueoClienteRepository.deleteById(id);
  }
}
