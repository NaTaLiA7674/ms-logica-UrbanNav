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
  Conductor,
} from '../models';
import {ViajeRepository} from '../repositories';

export class ViajeConductorController {
  constructor(
    @repository(ViajeRepository)
    public viajeRepository: ViajeRepository,
  ) { }

  @get('/viajes/{id}/conductor', {
    responses: {
      '200': {
        description: 'Conductor belonging to Viaje',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Conductor),
          },
        },
      },
    },
  })
  async getConductor(
    @param.path.number('id') id: typeof Viaje.prototype.id,
  ): Promise<Conductor> {
    return this.viajeRepository.conductor(id);
  }
}
