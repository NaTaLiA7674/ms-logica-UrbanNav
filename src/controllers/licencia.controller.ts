import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Licencia} from '../models';
import {LicenciaRepository} from '../repositories';

export class LicenciaController {
  constructor(
    @repository(LicenciaRepository)
    public licenciaRepository : LicenciaRepository,
  ) {}

  @post('/licencia')
  @response(200, {
    description: 'Licencia model instance',
    content: {'application/json': {schema: getModelSchemaRef(Licencia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Licencia, {
            title: 'NewLicencia',
            exclude: ['id'],
          }),
        },
      },
    })
    licencia: Omit<Licencia, 'id'>,
  ): Promise<Licencia> {
    return this.licenciaRepository.create(licencia);
  }

  @get('/licencia/count')
  @response(200, {
    description: 'Licencia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Licencia) where?: Where<Licencia>,
  ): Promise<Count> {
    return this.licenciaRepository.count(where);
  }

  @get('/licencia')
  @response(200, {
    description: 'Array of Licencia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Licencia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Licencia) filter?: Filter<Licencia>,
  ): Promise<Licencia[]> {
    return this.licenciaRepository.find(filter);
  }

  @patch('/licencia')
  @response(200, {
    description: 'Licencia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Licencia, {partial: true}),
        },
      },
    })
    licencia: Licencia,
    @param.where(Licencia) where?: Where<Licencia>,
  ): Promise<Count> {
    return this.licenciaRepository.updateAll(licencia, where);
  }

  @get('/licencia/{id}')
  @response(200, {
    description: 'Licencia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Licencia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Licencia, {exclude: 'where'}) filter?: FilterExcludingWhere<Licencia>
  ): Promise<Licencia> {
    return this.licenciaRepository.findById(id, filter);
  }

  @patch('/licencia/{id}')
  @response(204, {
    description: 'Licencia PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Licencia, {partial: true}),
        },
      },
    })
    licencia: Licencia,
  ): Promise<void> {
    await this.licenciaRepository.updateById(id, licencia);
  }

  @put('/licencia/{id}')
  @response(204, {
    description: 'Licencia PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() licencia: Licencia,
  ): Promise<void> {
    await this.licenciaRepository.replaceById(id, licencia);
  }

  @del('/licencia/{id}')
  @response(204, {
    description: 'Licencia DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.licenciaRepository.deleteById(id);
  }
}
