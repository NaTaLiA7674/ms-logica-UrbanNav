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
  Cliente,
  BotonPanico,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteBotonPanicoController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/boton-panicos', {
    responses: {
      '200': {
        description: 'Array of Cliente has many BotonPanico',
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
    return this.clienteRepository.botonPanico(id).find(filter);
  }

  @post('/clientes/{id}/boton-panicos', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(BotonPanico)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BotonPanico, {
            title: 'NewBotonPanicoInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) botonPanico: Omit<BotonPanico, 'id'>,
  ): Promise<BotonPanico> {
    return this.clienteRepository.botonPanico(id).create(botonPanico);
  }

  @patch('/clientes/{id}/boton-panicos', {
    responses: {
      '200': {
        description: 'Cliente.BotonPanico PATCH success count',
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
    return this.clienteRepository.botonPanico(id).patch(botonPanico, where);
  }

  @del('/clientes/{id}/boton-panicos', {
    responses: {
      '200': {
        description: 'Cliente.BotonPanico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BotonPanico)) where?: Where<BotonPanico>,
  ): Promise<Count> {
    return this.clienteRepository.botonPanico(id).delete(where);
  }
}
