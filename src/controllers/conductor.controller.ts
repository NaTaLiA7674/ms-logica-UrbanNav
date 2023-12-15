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
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Conductor, RegistroCompletoConductor} from '../models';
import {ConductorRepository, LicenciaRepository, VehiculoRepository} from '../repositories';
import {RegistroConductorService} from '../services';

export class ConductorController {
  constructor(
    @repository(ConductorRepository)
    public conductorRepository: ConductorRepository,
    @service(RegistroConductorService)
    public registroConductorService: RegistroConductorService,
    @repository(VehiculoRepository)
    private vehiculoRepository: VehiculoRepository,
    @repository(LicenciaRepository)
    private licenciaRepository: LicenciaRepository,
  ) { }

  @post('/conductor')
  @response(200, {
    description: 'Conductor model instance',
    content: {'application/json': {schema: getModelSchemaRef(RegistroCompletoConductor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroCompletoConductor, {
            title: 'NewConductor',
          }),
        },
      },
    })
    datosRegistro: RegistroCompletoConductor,
  ): Promise<Conductor> {
    let conductorCreado = await this.conductorRepository.create(datosRegistro.conductor);
    datosRegistro.vehiculo.conductorId = conductorCreado.id!;
    this.vehiculoRepository.create(datosRegistro.vehiculo)
    datosRegistro.licencia.conductorId = conductorCreado.id!;
    this.licenciaRepository.create(datosRegistro.licencia)
    this.registroConductorService.registrarConductor(conductorCreado);
    return conductorCreado
  }

  @get('/conductor/count')
  @response(200, {
    description: 'Conductor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Conductor) where?: Where<Conductor>,
  ): Promise<Count> {
    return this.conductorRepository.count(where);
  }

  @get('/conductor')
  @response(200, {
    description: 'Array of Conductor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Conductor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Conductor) filter?: Filter<Conductor>,
  ): Promise<Conductor[]> {
    return this.conductorRepository.find(filter);
  }

  @patch('/conductor')
  @response(200, {
    description: 'Conductor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conductor, {partial: true}),
        },
      },
    })
    conductor: Conductor,
    @param.where(Conductor) where?: Where<Conductor>,
  ): Promise<Count> {
    return this.conductorRepository.updateAll(conductor, where);
  }

  @get('/conductor/{id}')
  @response(200, {
    description: 'Conductor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Conductor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Conductor, {exclude: 'where'}) filter?: FilterExcludingWhere<Conductor>
  ): Promise<Conductor> {
    return this.conductorRepository.findById(id, filter);
  }

  @patch('/conductor/{id}')
  @response(204, {
    description: 'Conductor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conductor, {partial: true}),
        },
      },
    })
    conductor: Conductor,
  ): Promise<void> {
    await this.conductorRepository.updateById(id, conductor);
  }

  @put('/conductor/{id}')
  @response(204, {
    description: 'Conductor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() conductor: Conductor,
  ): Promise<void> {
    await this.conductorRepository.replaceById(id, conductor);
  }

  @del('/conductor/{id}')
  @response(204, {
    description: 'Conductor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.conductorRepository.deleteById(id);
  }
}

