import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Factura,
  Viaje,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaViajeController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/viaje', {
    responses: {
      '200': {
        description: 'Viaje belonging to Factura',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Viaje),
          },
        },
      },
    },
  })
  async getViaje(
    @param.path.number('id') id: typeof Factura.prototype.id,
  ): Promise<Viaje> {
    return this.facturaRepository.viaje(id);
  }
}
