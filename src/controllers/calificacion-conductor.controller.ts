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
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {CalificacionConductor} from '../models';
import {CalificacionConductorRepository, ClienteRepository, ConductorRepository} from '../repositories';

export class CalificacionConductorController {
  constructor(
    @repository(CalificacionConductorRepository)
    public calificacionConductorRepository: CalificacionConductorRepository,
    @repository(ClienteRepository)
    public ClienteRepository: ClienteRepository,
    @repository(ConductorRepository)
    public conductorRepository: ConductorRepository,
  ) { }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuCalificacionAlClienteId, ConfiguracionSeguridad.guardarAccion],
  })
  @post('/calificacion-conductor')
  @response(200, {
    description: 'CalificacionConductor model instance',
    content: {'application/json': {schema: getModelSchemaRef(CalificacionConductor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CalificacionConductor, {
            title: 'NewCalificacionConductor',
            exclude: ['id'],
          }),
        },
      },
    })
    calificacionConductor: Omit<CalificacionConductor, 'id'>,
  ): Promise<CalificacionConductor> {
    if (calificacionConductor.puntuacion < 1 || calificacionConductor.puntuacion > 5) {
      throw new HttpErrors.BadRequest('La calificación debe estar entre 1 y 5');
    }
    return this.calificacionConductorRepository.create(calificacionConductor);
  }

  @get('/calificacion-conductor/count')
  @response(200, {
    description: 'CalificacionConductor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CalificacionConductor) where?: Where<CalificacionConductor>,
  ): Promise<Count> {
    return this.calificacionConductorRepository.count(where);
  }

  @get('/calificacion-conductor')
  @response(200, {
    description: 'Array of CalificacionConductor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CalificacionConductor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CalificacionConductor) filter?: Filter<CalificacionConductor>,
  ): Promise<CalificacionConductor[]> {
    return this.calificacionConductorRepository.find(filter);
  }

  @patch('/calificacion-conductor')
  @response(200, {
    description: 'CalificacionConductor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CalificacionConductor, {partial: true}),
        },
      },
    })
    calificacionConductor: CalificacionConductor,
    @param.where(CalificacionConductor) where?: Where<CalificacionConductor>,
  ): Promise<Count> {
    return this.calificacionConductorRepository.updateAll(calificacionConductor, where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuCalificacionAlClienteId, ConfiguracionSeguridad.descargarAccion],
  })
  @get('/calificacion-conductor/{id}')
  @response(200, {
    description: 'CalificacionConductor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CalificacionConductor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CalificacionConductor, {exclude: 'where'}) filter?: FilterExcludingWhere<CalificacionConductor>
  ): Promise<CalificacionConductor> {
    return this.calificacionConductorRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuCalificacionAlClienteId, ConfiguracionSeguridad.editarAccion],
  })
  @patch('/calificacion-conductor/{id}')
  @response(204, {
    description: 'CalificacionConductor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CalificacionConductor, {partial: true}),
        },
      },
    })
    calificacionConductor: CalificacionConductor,
  ): Promise<void> {
    await this.calificacionConductorRepository.updateById(id, calificacionConductor);
  }

  @put('/calificacion-conductor/{id}')
  @response(204, {
    description: 'CalificacionConductor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() calificacionConductor: CalificacionConductor,
  ): Promise<void> {
    await this.calificacionConductorRepository.replaceById(id, calificacionConductor);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuCalificacionAlClienteId, ConfiguracionSeguridad.eliminarAccion],
  })
  @del('/calificacion-conductor/{id}')
  @response(204, {
    description: 'CalificacionConductor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.calificacionConductorRepository.deleteById(id);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuCalificacionAlClienteId, ConfiguracionSeguridad.listarAccion],
  })
  @get('/calificacion-conductor/{clienteId}')
  @response(200, {
    description: 'Array of CalificacionCliente model instances for a specific cliente',
    content: {
      'application/json': {
        schema: {type: 'array', items: getModelSchemaRef(CalificacionConductor, {includeRelations: true})},
      },
    },
  })
  async findCalificacionesPorCliente(
    @param.path.number('clienteId') clienteId: number,
    @param.filter(CalificacionConductor) filter?: Filter<CalificacionConductor>,
  ): Promise<CalificacionConductor[]> {
    // Obtener todas las calificaciones dejadas al cliente específico
    const calificaciones = await this.calificacionConductorRepository.find({
      where: {clienteId: clienteId}, // Asumiendo que tienes una propiedad "clienteId" en el modelo CalificacionCliente que vincula al cliente
    }, filter);

    return calificaciones;
  }

}
