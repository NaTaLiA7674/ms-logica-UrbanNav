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
  Parada,
} from '../models';
import {ViajeRepository} from '../repositories';

export class ViajeParadaController {
  constructor(
    @repository(ViajeRepository)
    public viajeRepository: ViajeRepository,
  ) { }

  @get('/viajes/{id}/parada', {
    responses: {
      '200': {
        description: 'Parada belonging to Viaje',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Parada),
          },
        },
      },
    },
  })
  async getParada(
    @param.path.number('id') id: typeof Viaje.prototype.id,
  ): Promise<Parada> {
    return this.viajeRepository.puntoDestino(id);
  }
}
