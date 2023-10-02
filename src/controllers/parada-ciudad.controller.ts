import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Parada,
  Ciudad,
} from '../models';
import {ParadaRepository} from '../repositories';

export class ParadaCiudadController {
  constructor(
    @repository(ParadaRepository)
    public paradaRepository: ParadaRepository,
  ) { }

  @get('/paradas/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Parada',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ciudad),
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.number('id') id: typeof Parada.prototype.id,
  ): Promise<Ciudad> {
    return this.paradaRepository.ciudad(id);
  }
}
