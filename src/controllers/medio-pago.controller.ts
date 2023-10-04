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
import {MedioPago} from '../models';
import {MedioPagoRepository} from '../repositories';

export class MedioPagoController {
  constructor(
    @repository(MedioPagoRepository)
    public medioPagoRepository : MedioPagoRepository,
  ) {}

  @post('/medio-pago')
  @response(200, {
    description: 'MedioPago model instance',
    content: {'application/json': {schema: getModelSchemaRef(MedioPago)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedioPago, {
            title: 'NewMedioPago',
            exclude: ['id'],
          }),
        },
      },
    })
    medioPago: Omit<MedioPago, 'id'>,
  ): Promise<MedioPago> {
    return this.medioPagoRepository.create(medioPago);
  }

  @get('/medio-pago/count')
  @response(200, {
    description: 'MedioPago model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MedioPago) where?: Where<MedioPago>,
  ): Promise<Count> {
    return this.medioPagoRepository.count(where);
  }

  @get('/medio-pago')
  @response(200, {
    description: 'Array of MedioPago model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MedioPago, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MedioPago) filter?: Filter<MedioPago>,
  ): Promise<MedioPago[]> {
    return this.medioPagoRepository.find(filter);
  }

  @patch('/medio-pago')
  @response(200, {
    description: 'MedioPago PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedioPago, {partial: true}),
        },
      },
    })
    medioPago: MedioPago,
    @param.where(MedioPago) where?: Where<MedioPago>,
  ): Promise<Count> {
    return this.medioPagoRepository.updateAll(medioPago, where);
  }

  @get('/medio-pago/{id}')
  @response(200, {
    description: 'MedioPago model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MedioPago, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MedioPago, {exclude: 'where'}) filter?: FilterExcludingWhere<MedioPago>
  ): Promise<MedioPago> {
    return this.medioPagoRepository.findById(id, filter);
  }

  @patch('/medio-pago/{id}')
  @response(204, {
    description: 'MedioPago PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedioPago, {partial: true}),
        },
      },
    })
    medioPago: MedioPago,
  ): Promise<void> {
    await this.medioPagoRepository.updateById(id, medioPago);
  }

  @put('/medio-pago/{id}')
  @response(204, {
    description: 'MedioPago PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() medioPago: MedioPago,
  ): Promise<void> {
    await this.medioPagoRepository.replaceById(id, medioPago);
  }

  @del('/medio-pago/{id}')
  @response(204, {
    description: 'MedioPago DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.medioPagoRepository.deleteById(id);
  }
}
