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
  Ciudad,
  Parada,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadParadaController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/paradas', {
    responses: {
      '200': {
        description: 'Array of Ciudad has many Parada',
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
    return this.ciudadRepository.parada(id).find(filter);
  }

  @post('/ciudads/{id}/paradas', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parada)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Ciudad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parada, {
            title: 'NewParadaInCiudad',
            exclude: ['id'],
            optional: ['ubicacionId']
          }),
        },
      },
    }) parada: Omit<Parada, 'id'>,
  ): Promise<Parada> {
    return this.ciudadRepository.parada(id).create(parada);
  }

  @patch('/ciudads/{id}/paradas', {
    responses: {
      '200': {
        description: 'Ciudad.Parada PATCH success count',
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
    return this.ciudadRepository.parada(id).patch(parada, where);
  }

  @del('/ciudads/{id}/paradas', {
    responses: {
      '200': {
        description: 'Ciudad.Parada DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Parada)) where?: Where<Parada>,
  ): Promise<Count> {
    return this.ciudadRepository.parada(id).delete(where);
  }
}
