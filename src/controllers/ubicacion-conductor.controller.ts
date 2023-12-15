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
import {Conductor, UbicacionConductor} from '../models';
import {ConductorRepository, UbicacionConductorRepository} from '../repositories';

export class UbicacionConductorController {
  constructor(
    @repository(UbicacionConductorRepository)
    public ubicacionConductorRepository: UbicacionConductorRepository,
    @repository(ConductorRepository)
    public conductorRepository: ConductorRepository,
  ) { }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuEstablecerOrigenDestino, ConfiguracionSeguridad.guardarAccion],
  })
  @post('/ubicacionConductor')
  @response(200, {
    description: 'UbicacionConductor model instance',
    content: {'application/json': {schema: getModelSchemaRef(UbicacionConductor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UbicacionConductor, {
            title: 'NewUbicacionConductor',
            exclude: ['id'],
          }),
        },
      },
    })
    ubicacionConductor: Omit<UbicacionConductor, 'id'>,
  ): Promise<UbicacionConductor> {
    return this.ubicacionConductorRepository.create(ubicacionConductor);
  }

  @get('/ubicacionConductor/count')
  @response(200, {
    description: 'UbicacionConductor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UbicacionConductor) where?: Where<UbicacionConductor>,
  ): Promise<Count> {
    return this.ubicacionConductorRepository.count(where);
  }

  @get('/ubicacionConductor')
  @response(200, {
    description: 'Array of UbicacionConductor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UbicacionConductor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UbicacionConductor) filter?: Filter<UbicacionConductor>,
  ): Promise<UbicacionConductor[]> {
    return this.ubicacionConductorRepository.find(filter);
  }

  @patch('/ubicacionConductor')
  @response(200, {
    description: 'UbicacionConductor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UbicacionConductor, {partial: true}),
        },
      },
    })
    ubicacionConductor: UbicacionConductor,
    @param.where(UbicacionConductor) where?: Where<UbicacionConductor>,
  ): Promise<Count> {
    return this.ubicacionConductorRepository.updateAll(ubicacionConductor, where);
  }

  @get('/ubicacionConductor/{id}')
  @response(200, {
    description: 'UbicacionConductor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UbicacionConductor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UbicacionConductor, {exclude: 'where'}) filter?: FilterExcludingWhere<UbicacionConductor>
  ): Promise<UbicacionConductor> {
    return this.ubicacionConductorRepository.findById(id, filter);
  }

  @patch('/ubicacionConductor/{id}')
  @response(204, {
    description: 'UbicacionConductor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UbicacionConductor, {partial: true}),
        },
      },
    })
    ubicacionConductor: UbicacionConductor,
  ): Promise<void> {
    await this.ubicacionConductorRepository.updateById(id, ubicacionConductor);
  }

  @put('/ubicacionConductor/{id}')
  @response(204, {
    description: 'UbicacionConductor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ubicacionConductor: UbicacionConductor,
  ): Promise<void> {
    await this.ubicacionConductorRepository.replaceById(id, ubicacionConductor);
  }

  @del('/ubicacionConductor/{id}')
  @response(204, {
    description: 'UbicacionConductor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ubicacionConductorRepository.deleteById(id);
  }

  //Metodos personalizados
  // ...

  //obtener los conductores que estan en una parada
  @get('/ubicacionConductor/{origenId}')
  @response(200, {
    description: 'Array of UbicacionConductor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Conductor, {includeRelations: true}),
        },
      },
    },
  })
  async obtenerConductoresEnParada(
    @param.path.number('origenId') origenId: number,
    @param.filter(Conductor) filter?: Filter<Conductor>,
  ): Promise<Conductor[]> {
    const ubicaciones = await this.ubicacionConductorRepository.find({where: {origenId: origenId}});
    const conductorId = ubicaciones.map(ubicacion => ubicacion.conductorId);
    return this.conductorRepository.find({where: {id: {inq: conductorId}}});
  }

}

// ...

