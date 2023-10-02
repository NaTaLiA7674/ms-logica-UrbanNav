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
  Viaje,
} from '../models';
import {ParadaRepository} from '../repositories';

export class ParadaViajeController {
  constructor(
    @repository(ParadaRepository) protected paradaRepository: ParadaRepository,
  ) { }

  @get('/paradas/{id}/viajes', {
    responses: {
      '200': {
        description: 'Array of Parada has many Viaje',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Viaje)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Viaje>,
  ): Promise<Viaje[]> {
    return this.paradaRepository.viaje(id).find(filter);
  }

  @post('/paradas/{id}/viajes', {
    responses: {
      '200': {
        description: 'Parada model instance',
        content: {'application/json': {schema: getModelSchemaRef(Viaje)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Parada.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Viaje, {
            title: 'NewViajeInParada',
            exclude: ['id'],
            optional: ['paradaId']
          }),
        },
      },
    }) viaje: Omit<Viaje, 'id'>,
  ): Promise<Viaje> {
    return this.paradaRepository.viaje(id).create(viaje);
  }

  @patch('/paradas/{id}/viajes', {
    responses: {
      '200': {
        description: 'Parada.Viaje PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Viaje, {partial: true}),
        },
      },
    })
    viaje: Partial<Viaje>,
    @param.query.object('where', getWhereSchemaFor(Viaje)) where?: Where<Viaje>,
  ): Promise<Count> {
    return this.paradaRepository.viaje(id).patch(viaje, where);
  }

  @del('/paradas/{id}/viajes', {
    responses: {
      '200': {
        description: 'Parada.Viaje DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Viaje)) where?: Where<Viaje>,
  ): Promise<Count> {
    return this.paradaRepository.viaje(id).delete(where);
  }
}
