import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Licencia,
  Conductor,
} from '../models';
import {LicenciaRepository} from '../repositories';

export class LicenciaConductorController {
  constructor(
    @repository(LicenciaRepository)
    public licenciaRepository: LicenciaRepository,
  ) { }

  @get('/licencias/{id}/conductor', {
    responses: {
      '200': {
        description: 'Conductor belonging to Licencia',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Conductor),
          },
        },
      },
    },
  })
  async getConductor(
    @param.path.number('id') id: typeof Licencia.prototype.id,
  ): Promise<Conductor> {
    return this.licenciaRepository.conductor(id);
  }
}
