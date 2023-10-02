import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Conductor,
  Licencia,
} from '../models';
import {ConductorRepository} from '../repositories';

export class ConductorLicenciaController {
  constructor(
    @repository(ConductorRepository)
    public conductorRepository: ConductorRepository,
  ) { }

  @get('/conductors/{id}/licencia', {
    responses: {
      '200': {
        description: 'Licencia belonging to Conductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Licencia),
          },
        },
      },
    },
  })
  async getLicencia(
    @param.path.number('id') id: typeof Conductor.prototype.id,
  ): Promise<Licencia> {
    return this.conductorRepository.licencia(id);
  }
}
