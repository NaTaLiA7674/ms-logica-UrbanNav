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
import {CalificacionConductor} from '../models';
import {CalificacionConductorRepository, ClienteRepository, ConductorRepository} from '../repositories';
import {CalificarAlClienteService} from '../services';

export class CalificacionConductorController {
  constructor(
    @repository(CalificacionConductorRepository)
    public calificacionConductorRepository: CalificacionConductorRepository,
    @repository(ClienteRepository)
    public ClienteRepository: ClienteRepository,
    @repository(ConductorRepository)
    public conductorRepository: ConductorRepository,
    @service(CalificarAlClienteService)
    public calificarAlClienteService: CalificarAlClienteService,
  ) { }

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

  @post('/calificaciones/{id}/calificar-cliente')
  async calificarCliente(
    @param.path.number('id') id: number,
    @requestBody() calificacion: CalificacionConductor,
  ): Promise<CalificacionConductor> {
    try {
      // Obtén los datos necesarios del cliente y del conductor, por ejemplo, utilizando servicios o repositorios
      const cliente = await this.ClienteRepository.findById(calificacion.clienteId);
      const conductor = await this.conductorRepository.findById(calificacion.conductorId);

      // Llama al servicio para calificar y dejar comentarios
      const calificacionGuardada = await this.calificarAlClienteService.crearCalificacionAlCliente(calificacion, cliente, conductor);

      return calificacionGuardada;
    } catch (error) {
      //Manejo de errores
      console.error('Error al calificar al cliente:', error);

      if (error instanceof HttpErrors.BadRequest) {
        throw new HttpErrors.BadRequest('No se pudo calificar al cliente: ' + error.message);
      } else {
        throw new HttpErrors.InternalServerError('Hubo un problema al calificar al cliente');
      }
    }
  }

  @del('/calificacion-conductor/{id}')
  @response(204, {
    description: 'CalificacionConductor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.calificacionConductorRepository.deleteById(id);
  }
}
