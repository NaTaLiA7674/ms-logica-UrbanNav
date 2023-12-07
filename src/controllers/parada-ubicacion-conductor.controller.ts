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
  UbicacionConductor,
} from '../models';
import {ParadaRepository} from '../repositories';

export class ParadaUbicacionConductorController {
  constructor(
    @repository(ParadaRepository) protected paradaRepository: ParadaRepository,
  ) { }

  @get('/paradas/{id}/ubicacion-conductors', {
    responses: {
      '200': {
        description: 'Array of Parada has many UbicacionConductor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UbicacionConductor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UbicacionConductor>,
  ): Promise<UbicacionConductor[]> {
    return this.paradaRepository.ubicacionConductor(id).find(filter);
  }

  @post('/paradas/{id}/ubicacion-conductors', {
    responses: {
      '200': {
        description: 'Parada model instance',
        content: {'application/json': {schema: getModelSchemaRef(UbicacionConductor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Parada.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UbicacionConductor, {
            title: 'NewUbicacionConductorInParada',
            exclude: ['id'],
            optional: ['paradaId']
          }),
        },
      },
    }) ubicacionConductor: Omit<UbicacionConductor, 'id'>,
  ): Promise<UbicacionConductor> {
    return this.paradaRepository.ubicacionConductor(id).create(ubicacionConductor);
  }

  @patch('/paradas/{id}/ubicacion-conductors', {
    responses: {
      '200': {
        description: 'Parada.UbicacionConductor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UbicacionConductor, {partial: true}),
        },
      },
    })
    ubicacionConductor: Partial<UbicacionConductor>,
    @param.query.object('where', getWhereSchemaFor(UbicacionConductor)) where?: Where<UbicacionConductor>,
  ): Promise<Count> {
    return this.paradaRepository.ubicacionConductor(id).patch(ubicacionConductor, where);
  }

  @del('/paradas/{id}/ubicacion-conductors', {
    responses: {
      '200': {
        description: 'Parada.UbicacionConductor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UbicacionConductor)) where?: Where<UbicacionConductor>,
  ): Promise<Count> {
    return this.paradaRepository.ubicacionConductor(id).delete(where);
  }
}
