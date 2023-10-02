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
  Viaje,
  EstadoViaje,
} from '../models';
import {ViajeRepository} from '../repositories';

export class ViajeEstadoViajeController {
  constructor(
    @repository(ViajeRepository) protected viajeRepository: ViajeRepository,
  ) { }

  @get('/viajes/{id}/estado-viajes', {
    responses: {
      '200': {
        description: 'Array of Viaje has many EstadoViaje',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EstadoViaje)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EstadoViaje>,
  ): Promise<EstadoViaje[]> {
    return this.viajeRepository.estadoViaje(id).find(filter);
  }

  @post('/viajes/{id}/estado-viajes', {
    responses: {
      '200': {
        description: 'Viaje model instance',
        content: {'application/json': {schema: getModelSchemaRef(EstadoViaje)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Viaje.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoViaje, {
            title: 'NewEstadoViajeInViaje',
            exclude: ['id'],
            optional: ['viajeId']
          }),
        },
      },
    }) estadoViaje: Omit<EstadoViaje, 'id'>,
  ): Promise<EstadoViaje> {
    return this.viajeRepository.estadoViaje(id).create(estadoViaje);
  }

  @patch('/viajes/{id}/estado-viajes', {
    responses: {
      '200': {
        description: 'Viaje.EstadoViaje PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoViaje, {partial: true}),
        },
      },
    })
    estadoViaje: Partial<EstadoViaje>,
    @param.query.object('where', getWhereSchemaFor(EstadoViaje)) where?: Where<EstadoViaje>,
  ): Promise<Count> {
    return this.viajeRepository.estadoViaje(id).patch(estadoViaje, where);
  }

  @del('/viajes/{id}/estado-viajes', {
    responses: {
      '200': {
        description: 'Viaje.EstadoViaje DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EstadoViaje)) where?: Where<EstadoViaje>,
  ): Promise<Count> {
    return this.viajeRepository.estadoViaje(id).delete(where);
  }
}
