import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UbicacionConductor,
  Conductor,
} from '../models';
import {UbicacionConductorRepository} from '../repositories';

export class UbicacionConductorConductorController {
  constructor(
    @repository(UbicacionConductorRepository)
    public ubicacionConductorRepository: UbicacionConductorRepository,
  ) { }

  @get('/ubicacion-conductors/{id}/conductor', {
    responses: {
      '200': {
        description: 'Conductor belonging to UbicacionConductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Conductor),
          },
        },
      },
    },
  })
  async getConductor(
    @param.path.number('id') id: typeof UbicacionConductor.prototype.id,
  ): Promise<Conductor> {
    return this.ubicacionConductorRepository.conductor(id);
  }
}
