import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EstadoConductor,
  Conductor,
} from '../models';
import {EstadoConductorRepository} from '../repositories';

export class EstadoConductorConductorController {
  constructor(
    @repository(EstadoConductorRepository)
    public estadoConductorRepository: EstadoConductorRepository,
  ) { }

  @get('/estado-conductors/{id}/conductor', {
    responses: {
      '200': {
        description: 'Conductor belonging to EstadoConductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Conductor),
          },
        },
      },
    },
  })
  async getConductor(
    @param.path.number('id') id: typeof EstadoConductor.prototype.id,
  ): Promise<Conductor> {
    return this.estadoConductorRepository.conductor(id);
  }
}
