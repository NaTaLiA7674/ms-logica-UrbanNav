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
  BotonPanico,
} from '../models';
import {ConductorRepository} from '../repositories';

export class ConductorBotonPanicoController {
  constructor(
    @repository(ConductorRepository) protected conductorRepository: ConductorRepository,
  ) { }

  @get('/conductors/{id}/boton-panicos', {
    responses: {
      '200': {
        description: 'Array of Conductor has many BotonPanico',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BotonPanico)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<BotonPanico>,
  ): Promise<BotonPanico[]> {
    return this.conductorRepository.botonPanico(id).find(filter);
  }

  @post('/conductors/{id}/boton-panicos', {
    responses: {
      '200': {
        description: 'Conductor model instance',
        content: {'application/json': {schema: getModelSchemaRef(BotonPanico)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Conductor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BotonPanico, {
            title: 'NewBotonPanicoInConductor',
            exclude: ['id'],
            optional: ['conductorId']
          }),
        },
      },
    }) botonPanico: Omit<BotonPanico, 'id'>,
  ): Promise<BotonPanico> {
    return this.conductorRepository.botonPanico(id).create(botonPanico);
  }

  @patch('/conductors/{id}/boton-panicos', {
    responses: {
      '200': {
        description: 'Conductor.BotonPanico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BotonPanico, {partial: true}),
        },
      },
    })
    botonPanico: Partial<BotonPanico>,
    @param.query.object('where', getWhereSchemaFor(BotonPanico)) where?: Where<BotonPanico>,
  ): Promise<Count> {
    return this.conductorRepository.botonPanico(id).patch(botonPanico, where);
  }

  @del('/conductors/{id}/boton-panicos', {
    responses: {
      '200': {
        description: 'Conductor.BotonPanico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BotonPanico)) where?: Where<BotonPanico>,
  ): Promise<Count> {
    return this.conductorRepository.botonPanico(id).delete(where);
  }
}
