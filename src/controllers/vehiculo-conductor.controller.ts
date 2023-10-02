import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  Conductor,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoConductorController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/conductor', {
    responses: {
      '200': {
        description: 'Conductor belonging to Vehiculo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Conductor),
          },
        },
      },
    },
  })
  async getConductor(
    @param.path.number('id') id: typeof Vehiculo.prototype.id,
  ): Promise<Conductor> {
    return this.vehiculoRepository.conductor(id);
  }
}
