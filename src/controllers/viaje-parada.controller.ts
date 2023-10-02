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
  Parada,
} from '../models';
import {ViajeRepository} from '../repositories';

export class ViajeParadaController {
  constructor(
    @repository(ViajeRepository) protected viajeRepository: ViajeRepository,
  ) { }

  @get('/viajes/{id}/paradas', {
    responses: {
      '200': {
        description: 'Array of Viaje has many Parada',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parada)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Parada>,
  ): Promise<Parada[]> {
    return this.viajeRepository.idPuntoDestino(id).find(filter);
  }

  @post('/viajes/{id}/paradas', {
    responses: {
      '200': {
        description: 'Viaje model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parada)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Viaje.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parada, {
            title: 'NewParadaInViaje',
            exclude: ['id'],
            optional: ['idPuntoOrigen']
          }),
        },
      },
    }) parada: Omit<Parada, 'id'>,
  ): Promise<Parada> {
    return this.viajeRepository.idPuntoDestino(id).create(parada);
  }

  @patch('/viajes/{id}/paradas', {
    responses: {
      '200': {
        description: 'Viaje.Parada PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parada, {partial: true}),
        },
      },
    })
    parada: Partial<Parada>,
    @param.query.object('where', getWhereSchemaFor(Parada)) where?: Where<Parada>,
  ): Promise<Count> {
    return this.viajeRepository.idPuntoDestino(id).patch(parada, where);
  }

  @del('/viajes/{id}/paradas', {
    responses: {
      '200': {
        description: 'Viaje.Parada DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Parada)) where?: Where<Parada>,
  ): Promise<Count> {
    return this.viajeRepository.idPuntoDestino(id).delete(where);
  }
}
