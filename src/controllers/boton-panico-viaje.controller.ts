import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  BotonPanico,
  Viaje,
} from '../models';
import {BotonPanicoRepository} from '../repositories';

export class BotonPanicoViajeController {
  constructor(
    @repository(BotonPanicoRepository)
    public botonPanicoRepository: BotonPanicoRepository,
  ) { }

  @get('/boton-panicos/{id}/viaje', {
    responses: {
      '200': {
        description: 'Viaje belonging to BotonPanico',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Viaje),
          },
        },
      },
    },
  })
  async getViaje(
    @param.path.number('id') id: typeof BotonPanico.prototype.id,
  ): Promise<Viaje> {
    return this.botonPanicoRepository.viaje(id);
  }
}
