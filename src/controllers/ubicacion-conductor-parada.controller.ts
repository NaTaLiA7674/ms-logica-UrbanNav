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
  Parada,
} from '../models';
import {UbicacionConductorRepository} from '../repositories';

export class UbicacionConductorParadaController {
  constructor(
    @repository(UbicacionConductorRepository)
    public ubicacionConductorRepository: UbicacionConductorRepository,
  ) { }

  @get('/ubicacion-conductors/{id}/parada', {
    responses: {
      '200': {
        description: 'Parada belonging to UbicacionConductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Parada),
          },
        },
      },
    },
  })
  async getParada(
    @param.path.number('id') id: typeof UbicacionConductor.prototype.id,
  ): Promise<Parada> {
    return this.ubicacionConductorRepository.origen(id);
  }
}
