import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Viaje,
  CalificacionConductor,
} from '../models';
import {ViajeRepository} from '../repositories';

export class ViajeCalificacionConductorController {
  constructor(
    @repository(ViajeRepository)
    public viajeRepository: ViajeRepository,
  ) { }

  @get('/viajes/{id}/calificacion-conductor', {
    responses: {
      '200': {
        description: 'CalificacionConductor belonging to Viaje',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CalificacionConductor),
          },
        },
      },
    },
  })
  async getCalificacionConductor(
    @param.path.number('id') id: typeof Viaje.prototype.id,
  ): Promise<CalificacionConductor> {
    return this.viajeRepository.calificacionConductor(id);
  }
}
