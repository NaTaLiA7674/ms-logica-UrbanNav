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
  BotonPanico,
} from '../models';
import {ViajeRepository} from '../repositories';

export class ViajeBotonPanicoController {
  constructor(
    @repository(ViajeRepository)
    public viajeRepository: ViajeRepository,
  ) { }

  @get('/viajes/{id}/boton-panico', {
    responses: {
      '200': {
        description: 'BotonPanico belonging to Viaje',
        content: {
          'application/json': {
            schema: getModelSchemaRef(BotonPanico),
          },
        },
      },
    },
  })
  async getBotonPanico(
    @param.path.number('id') id: typeof Viaje.prototype.id,
  ): Promise<BotonPanico> {
    return this.viajeRepository.botonPanico(id);
  }
}
