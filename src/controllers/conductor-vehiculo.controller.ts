import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Conductor,
  Vehiculo,
} from '../models';
import {ConductorRepository} from '../repositories';

export class ConductorVehiculoController {
  constructor(
    @repository(ConductorRepository)
    public conductorRepository: ConductorRepository,
  ) { }

  @get('/conductors/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Conductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vehiculo),
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.number('id') id: typeof Conductor.prototype.id,
  ): Promise<Vehiculo> {
    return this.conductorRepository.vehiculo(id);
  }
}
