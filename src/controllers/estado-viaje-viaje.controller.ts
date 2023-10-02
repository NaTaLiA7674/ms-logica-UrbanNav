import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EstadoViaje,
  Viaje,
} from '../models';
import {EstadoViajeRepository} from '../repositories';

export class EstadoViajeViajeController {
  constructor(
    @repository(EstadoViajeRepository)
    public estadoViajeRepository: EstadoViajeRepository,
  ) { }

  @get('/estado-viajes/{id}/viaje', {
    responses: {
      '200': {
        description: 'Viaje belonging to EstadoViaje',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Viaje),
          },
        },
      },
    },
  })
  async getViaje(
    @param.path.number('id') id: typeof EstadoViaje.prototype.id,
  ): Promise<Viaje> {
    return this.estadoViajeRepository.viaje(id);
  }
}
