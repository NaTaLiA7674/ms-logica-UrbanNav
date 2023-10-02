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
  Distancias,
} from '../models';
import {ParadaRepository} from '../repositories';

export class ParadaDistanciasController {
  constructor(
    @repository(ParadaRepository)
    public paradaRepository: ParadaRepository,
  ) { }

  @get('/paradas/{id}/distancias', {
    responses: {
      '200': {
        description: 'Distancias belonging to Parada',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Distancias),
          },
        },
      },
    },
  })
  async getDistancias(
    @param.path.number('id') id: typeof Parada.prototype.id,
  ): Promise<Distancias> {
    return this.paradaRepository.distancia(id);
  }
}
