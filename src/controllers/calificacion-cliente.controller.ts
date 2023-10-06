import {service} from '@loopback/core';
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
import {CalificacionCliente} from '../models';
import {CalificacionClienteRepository, ClienteRepository, ConductorRepository} from '../repositories';
import {CalificarAlConductorService} from '../services';

export class CalificacionClienteController {
  constructor(
    @repository(CalificacionClienteRepository)
    public calificacionClienteRepository: CalificacionClienteRepository,
    @repository(ClienteRepository)
    public ClienteRepository: ClienteRepository,
    @repository(ConductorRepository)
    public conductorRepository: ConductorRepository,
    @service(CalificarAlConductorService)
    public calificarAlConductorService: CalificarAlConductorService,
  ) { }

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

  @post('/calificaciones/{id}/calificar-conductor')
  async calificarConductor(
    @param.path.number('id') id: number,
    @requestBody() calificacion: CalificacionCliente,
  ): Promise<CalificacionCliente> {
    try {
      // Obtén los datos necesarios del cliente y del conductor, por ejemplo, utilizando servicios o repositorios
      const cliente = await this.ClienteRepository.findById(calificacion.clienteId);
      const conductor = await this.conductorRepository.findById(calificacion.conductorId);

      // Llama al servicio para calificar y dejar comentarios
      const calificacionGuardada = await this.calificarAlConductorService.crearCalificacionAlConductor(calificacion, cliente, conductor);

      return calificacionGuardada;
    } catch (error) {
      //Manejo de errores
      console.error('Error al calificar al conductor:', error);

      if (error instanceof HttpErrors.BadRequest) {
        throw new HttpErrors.BadRequest('No se pudo calificar al conductor: ' + error.message);
      } else {
        throw new HttpErrors.InternalServerError('Hubo un problema al calificar al conductor');
      }
    }
  }

  @get('/calificacion-cliente/{conductorId}', {
    responses: {
      '200': {
        description: 'Obtiene las calificaciones y comentarios de un conductor',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CalificacionCliente, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async obtenerCalificacionesComentariosConductor(
    @param.path.number('conductorId') conductorId: number,
    @param.query.object('filter') filter?: Filter<CalificacionCliente>,
  ): Promise<CalificacionCliente[]> {
    try {
      // Implementa la lógica para obtener las calificaciones y comentarios del conductor
      const calificacionesComentarios = await this.calificacionClienteRepository.find({where: {conductorId: conductorId}});
      return calificacionesComentarios;
    } catch (error) {
      console.error('Error al obtener calificaciones y comentarios del conductor', error);
      throw new HttpErrors.InternalServerError('No se pudo obtener las calificaciones y comentarios del conductor');
    }
  }


  @del('/calificacion-cliente/{id}')
  @response(204, {
    description: 'CalificacionCliente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.calificacionClienteRepository.deleteById(id);
  }
}
