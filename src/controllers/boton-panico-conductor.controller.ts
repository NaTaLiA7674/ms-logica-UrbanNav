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
  Conductor,
} from '../models';
import {BotonPanicoRepository} from '../repositories';

export class BotonPanicoConductorController {
  constructor(
    @repository(BotonPanicoRepository)
    public botonPanicoRepository: BotonPanicoRepository,
  ) { }

  @get('/boton-panicos/{id}/conductor', {
    responses: {
      '200': {
        description: 'Conductor belonging to BotonPanico',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Conductor),
          },
        },
      },
    },
  })
  async getConductor(
    @param.path.number('id') id: typeof BotonPanico.prototype.id,
  ): Promise<Conductor> {
    return this.botonPanicoRepository.conductor(id);
  }
}
