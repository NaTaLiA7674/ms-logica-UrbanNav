import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {Parada} from '../models';
import {ParadaRepository} from '../repositories';

export class ParadaController {
  constructor(
    @repository(ParadaRepository)
    public paradaRepository: ParadaRepository,
  ) { }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuParadasId, ConfiguracionSeguridad.guardarAccion],
  })
  @post('/parada')
  @response(200, {
    description: 'Parada model instance',
    content: {'application/json': {schema: getModelSchemaRef(Parada)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parada, {
            title: 'NewParada',
            exclude: ['id'],
          }),
        },
      },
    })
    parada: Omit<Parada, 'id'>,
  ): Promise<Parada> {
    return this.paradaRepository.create(parada);
  }

  @get('/parada/count')
  @response(200, {
    description: 'Parada model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Parada) where?: Where<Parada>,
  ): Promise<Count> {
    return this.paradaRepository.count(where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuParadasId, ConfiguracionSeguridad.listarAccion],
  })
  @get('/parada')
  @response(200, {
    description: 'Array of Parada model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Parada, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Parada) filter?: Filter<Parada>,
  ): Promise<Parada[]> {
    return this.paradaRepository.find(filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuParadasId, ConfiguracionSeguridad.editarAccion],
  })
  @patch('/parada')
  @response(200, {
    description: 'Parada PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parada, {partial: true}),
        },
      },
    })
    parada: Parada,
    @param.where(Parada) where?: Where<Parada>,
  ): Promise<Count> {
    return this.paradaRepository.updateAll(parada, where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuParadasId, ConfiguracionSeguridad.descargarAccion],
  })
  @get('/parada/{id}')
  @response(200, {
    description: 'Parada model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Parada, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Parada, {exclude: 'where'}) filter?: FilterExcludingWhere<Parada>
  ): Promise<Parada> {
    return this.paradaRepository.findById(id, filter);
  }

  @patch('/parada/{id}')
  @response(204, {
    description: 'Parada PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parada, {partial: true}),
        },
      },
    })
    parada: Parada,
  ): Promise<void> {
    await this.paradaRepository.updateById(id, parada);
  }

  @put('/parada/{id}')
  @response(204, {
    description: 'Parada PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() parada: Parada,
  ): Promise<void> {
    await this.paradaRepository.replaceById(id, parada);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuParadasId, ConfiguracionSeguridad.eliminarAccion],
  })
  @del('/parada/{id}')
  @response(204, {
    description: 'Parada DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.paradaRepository.deleteById(id);
  }
}
