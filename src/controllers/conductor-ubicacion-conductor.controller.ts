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
  Conductor,
  UbicacionConductor,
} from '../models';
import {ConductorRepository} from '../repositories';

export class ConductorUbicacionConductorController {
  constructor(
    @repository(ConductorRepository) protected conductorRepository: ConductorRepository,
  ) { }

  @get('/conductors/{id}/ubicacion-conductors', {
    responses: {
      '200': {
        description: 'Array of Conductor has many UbicacionConductor',
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
    return this.conductorRepository.ubicacionConductor(id).find(filter);
  }

  @post('/conductors/{id}/ubicacion-conductors', {
    responses: {
      '200': {
        description: 'Conductor model instance',
        content: {'application/json': {schema: getModelSchemaRef(UbicacionConductor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Conductor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UbicacionConductor, {
            title: 'NewUbicacionConductorInConductor',
            exclude: ['id'],
            optional: ['conductorId']
          }),
        },
      },
    }) ubicacionConductor: Omit<UbicacionConductor, 'id'>,
  ): Promise<UbicacionConductor> {
    return this.conductorRepository.ubicacionConductor(id).create(ubicacionConductor);
  }

  @patch('/conductors/{id}/ubicacion-conductors', {
    responses: {
      '200': {
        description: 'Conductor.UbicacionConductor PATCH success count',
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
    return this.conductorRepository.ubicacionConductor(id).patch(ubicacionConductor, where);
  }

  @del('/conductors/{id}/ubicacion-conductors', {
    responses: {
      '200': {
        description: 'Conductor.UbicacionConductor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UbicacionConductor)) where?: Where<UbicacionConductor>,
  ): Promise<Count> {
    return this.conductorRepository.ubicacionConductor(id).delete(where);
  }
}
