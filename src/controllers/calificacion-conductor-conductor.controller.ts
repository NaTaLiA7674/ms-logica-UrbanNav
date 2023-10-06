import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CalificacionConductor,
  Conductor,
} from '../models';
import {CalificacionConductorRepository} from '../repositories';

export class CalificacionConductorConductorController {
  constructor(
    @repository(CalificacionConductorRepository)
    public calificacionConductorRepository: CalificacionConductorRepository,
  ) { }

  @get('/calificacion-conductors/{id}/conductor', {
    responses: {
      '200': {
        description: 'Conductor belonging to CalificacionConductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Conductor),
          },
        },
      },
    },
  })
  async getConductor(
    @param.path.number('id') id: typeof CalificacionConductor.prototype.id,
  ): Promise<Conductor> {
    return this.calificacionConductorRepository.conductor(id);
  }
}
