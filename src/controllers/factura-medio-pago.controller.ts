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
  MedioPago,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaMedioPagoController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/medio-pago', {
    responses: {
      '200': {
        description: 'MedioPago belonging to Factura',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MedioPago),
          },
        },
      },
    },
  })
  async getMedioPago(
    @param.path.number('id') id: typeof Factura.prototype.id,
  ): Promise<MedioPago> {
    return this.facturaRepository.medioPago(id);
  }
}
