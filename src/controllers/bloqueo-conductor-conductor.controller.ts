import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  BloqueoConductor,
  Conductor,
} from '../models';
import {BloqueoConductorRepository} from '../repositories';

export class BloqueoConductorConductorController {
  constructor(
    @repository(BloqueoConductorRepository)
    public bloqueoConductorRepository: BloqueoConductorRepository,
  ) { }

  @get('/bloqueo-conductors/{id}/conductor', {
    responses: {
      '200': {
        description: 'Conductor belonging to BloqueoConductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Conductor),
          },
        },
      },
    },
  })
  async getConductor(
    @param.path.number('id') id: typeof BloqueoConductor.prototype.id,
  ): Promise<Conductor> {
    return this.bloqueoConductorRepository.conductor(id);
  }
}
