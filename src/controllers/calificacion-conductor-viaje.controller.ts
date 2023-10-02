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
  Viaje,
} from '../models';
import {CalificacionConductorRepository} from '../repositories';

export class CalificacionConductorViajeController {
  constructor(
    @repository(CalificacionConductorRepository)
    public calificacionConductorRepository: CalificacionConductorRepository,
  ) { }

  @get('/calificacion-conductors/{id}/viaje', {
    responses: {
      '200': {
        description: 'Viaje belonging to CalificacionConductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Viaje),
          },
        },
      },
    },
  })
  async getViaje(
    @param.path.number('id') id: typeof CalificacionConductor.prototype.id,
  ): Promise<Viaje> {
    return this.calificacionConductorRepository.viaje(id);
  }
}
