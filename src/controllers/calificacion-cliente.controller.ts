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
import {CalificacionCliente} from '../models';
import {CalificacionClienteRepository, ClienteRepository, ConductorRepository} from '../repositories';

export class CalificacionClienteController {
  constructor(
    @repository(CalificacionClienteRepository)
    public calificacionClienteRepository: CalificacionClienteRepository,
    @repository(ClienteRepository)
    public ClienteRepository: ClienteRepository,
    @repository(ConductorRepository)
    public conductorRepository: ConductorRepository,
  ) { }


  @authenticate({
    strategy: "auth",
    options: [ConfiguracionSeguridad.menuCalificacionAlConductorId, ConfiguracionSeguridad.guardarAccion]
  })
  @post('/calificacion-cliente')
  @response(200, {
    description: 'CalificacionCliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(CalificacionCliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CalificacionCliente, {
            title: 'NewCalificacionCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    calificacionCliente: Omit<CalificacionCliente, 'id'>,
  ): Promise<CalificacionCliente> {
    if (calificacionCliente.puntuacion < 1 || calificacionCliente.puntuacion > 5) {
      throw new HttpErrors.BadRequest('La calificación debe estar entre 1 y 5');
    }
    return this.calificacionClienteRepository.create(calificacionCliente);
  }

  @get('/calificacion-cliente/count')
  @response(200, {
    description: 'CalificacionCliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CalificacionCliente) where?: Where<CalificacionCliente>,
  ): Promise<Count> {
    return this.calificacionClienteRepository.count(where);
  }

  @get('/calificacion-cliente')
  @response(200, {
    description: 'Array of CalificacionCliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CalificacionCliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CalificacionCliente) filter?: Filter<CalificacionCliente>,
  ): Promise<CalificacionCliente[]> {
    return this.calificacionClienteRepository.find(filter);
  }

  @patch('/calificacion-cliente')
  @response(200, {
    description: 'CalificacionCliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CalificacionCliente, {partial: true}),
        },
      },
    })
    calificacionCliente: CalificacionCliente,
    @param.where(CalificacionCliente) where?: Where<CalificacionCliente>,
  ): Promise<Count> {
    return this.calificacionClienteRepository.updateAll(calificacionCliente, where);
  }

  @authenticate({
    strategy: "auth",
    options: [ConfiguracionSeguridad.menuCalificacionAlConductorId, ConfiguracionSeguridad.descargarAccion]
  })
  @get('/calificacion-cliente/{id}')
  @response(200, {
    description: 'CalificacionCliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CalificacionCliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CalificacionCliente, {exclude: 'where'}) filter?: FilterExcludingWhere<CalificacionCliente>
  ): Promise<CalificacionCliente> {
    return this.calificacionClienteRepository.findById(id, filter);
  }

  @authenticate({
    strategy: "auth",
    options: [ConfiguracionSeguridad.menuCalificacionAlConductorId, ConfiguracionSeguridad.editarAccion]
  })
  @patch('/calificacion-cliente/{id}')
  @response(204, {
    description: 'CalificacionCliente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CalificacionCliente, {partial: true}),
        },
      },
    })
    calificacionCliente: CalificacionCliente,
  ): Promise<void> {
    await this.calificacionClienteRepository.updateById(id, calificacionCliente);
  }

  @put('/calificacion-cliente/{id}')
  @response(204, {
    description: 'CalificacionCliente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() calificacionCliente: CalificacionCliente,
  ): Promise<void> {
    await this.calificacionClienteRepository.replaceById(id, calificacionCliente);
  }

  @authenticate({
    strategy: "auth",
    options: [ConfiguracionSeguridad.menuCalificacionAlConductorId, ConfiguracionSeguridad.listarAccion]
  })
  @get('/calificacion-cliente/{conductorId}')
  @response(200, {
    description: 'CalificacionCliente model instances for a specific conductor',
    content: {
      'application/json': {
        schema: {type: 'array', items: getModelSchemaRef(CalificacionCliente)},
      },
    },
  })
  async findCalificacionesPorConductor(
    @param.path.number('conductorId') conductorId: number,
    @param.filter(CalificacionCliente, {exclude: 'where'}) filter?: FilterExcludingWhere<CalificacionCliente>,
  ): Promise<CalificacionCliente[]> {
    // Obtener las calificaciones asignadas al conductor específico
    const calificaciones = await this.calificacionClienteRepository.find({
      where: {conductorId: conductorId},
    }, filter);

    return calificaciones;
  }


  @authenticate({
    strategy: "auth",
    options: [ConfiguracionSeguridad.menuCalificacionAlConductorId, ConfiguracionSeguridad.eliminarAccion]
  })
  @del('/calificacion-cliente/{id}')
  @response(204, {
    description: 'CalificacionCliente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.calificacionClienteRepository.deleteById(id);
  }
}
