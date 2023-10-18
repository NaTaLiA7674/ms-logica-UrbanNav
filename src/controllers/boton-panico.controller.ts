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
import {BotonPanico} from '../models';
import {BotonPanicoRepository} from '../repositories';
import {SolicitudViajeService} from '../services';

export class BotonPanicoController {
  constructor(
    @repository(BotonPanicoRepository)
    public botonPanicoRepository: BotonPanicoRepository,
    @repository(SolicitudViajeService)
    public solicitudViajeService: SolicitudViajeService,
  ) { }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuBotonPanicoId, ConfiguracionSeguridad.guardarAccion],
  })
  @post('/botonPanico')
  @response(200, {
    description: 'BotonPanico model instance',
    content: {'application/json': {schema: getModelSchemaRef(BotonPanico)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BotonPanico, {
            title: 'NewBotonPanico',
            exclude: ['id'],
          }),
        },
      },
    })
    botonPanico: Omit<BotonPanico, 'id'>,
  ): Promise<BotonPanico> {
    // Aquí debes inyectar una instancia de SolicitudViajeService
    const solicitudViajeService = this.solicitudViajeService; // Asegúrate de inyectar el servicio en tu controlador

    // Llama a la función enviarAlertaPanic del servicio con el clienteId
    const clienteId = botonPanico.clienteId; // Asumo que tienes un campo clienteId en tu modelo BotonPanico
    await solicitudViajeService.enviarAlertaPanic(clienteId);

    // Luego, puedes continuar con la creación del BotonPanico si es necesario
    return this.botonPanicoRepository.create(botonPanico);
  }
  @get('/botonPanico/count')
  @response(200, {
    description: 'BotonPanico model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BotonPanico) where?: Where<BotonPanico>,
  ): Promise<Count> {
    return this.botonPanicoRepository.count(where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuBotonPanicoId, ConfiguracionSeguridad.listarAccion],
  })
  @get('/botonPanico')
  @response(200, {
    description: 'Array of BotonPanico model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BotonPanico, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BotonPanico) filter?: Filter<BotonPanico>,
  ): Promise<BotonPanico[]> {
    return this.botonPanicoRepository.find(filter);
  }

  @patch('/botonPanico')
  @response(200, {
    description: 'BotonPanico PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BotonPanico, {partial: true}),
        },
      },
    })
    botonPanico: BotonPanico,
    @param.where(BotonPanico) where?: Where<BotonPanico>,
  ): Promise<Count> {
    return this.botonPanicoRepository.updateAll(botonPanico, where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuBotonPanicoId, ConfiguracionSeguridad.descargarAccion],
  })
  @get('/botonPanico/{id}')
  @response(200, {
    description: 'BotonPanico model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BotonPanico, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(BotonPanico, {exclude: 'where'}) filter?: FilterExcludingWhere<BotonPanico>
  ): Promise<BotonPanico> {
    return this.botonPanicoRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuBotonPanicoId, ConfiguracionSeguridad.editarAccion],
  })
  @patch('/botonPanico/{id}')
  @response(204, {
    description: 'BotonPanico PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BotonPanico, {partial: true}),
        },
      },
    })
    botonPanico: BotonPanico,
  ): Promise<void> {
    await this.botonPanicoRepository.updateById(id, botonPanico);
  }

  @put('/botonPanico/{id}')
  @response(204, {
    description: 'BotonPanico PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() botonPanico: BotonPanico,
  ): Promise<void> {
    await this.botonPanicoRepository.replaceById(id, botonPanico);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuBotonPanicoId, ConfiguracionSeguridad.eliminarAccion],
  })
  @del('/botonPanico/{id}')
  @response(204, {
    description: 'BotonPanico DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.botonPanicoRepository.deleteById(id);
  }
}
