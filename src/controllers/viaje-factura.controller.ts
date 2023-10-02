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
  Factura,
} from '../models';
import {ViajeRepository} from '../repositories';

export class ViajeFacturaController {
  constructor(
    @repository(ViajeRepository)
    public viajeRepository: ViajeRepository,
  ) { }

  @get('/viajes/{id}/factura', {
    responses: {
      '200': {
        description: 'Factura belonging to Viaje',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Factura),
          },
        },
      },
    },
  })
  async getFactura(
    @param.path.number('id') id: typeof Viaje.prototype.id,
  ): Promise<Factura> {
    return this.viajeRepository.factura(id);
  }
}
