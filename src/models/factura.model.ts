import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Viaje} from './viaje.model';
import {MedioPago} from './medio-pago.model';
import {Cliente} from './cliente.model';

@model()
export class Factura extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  montoTotal: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaHora: string;

  @belongsTo(() => Viaje)
  viajeId: number;

  @belongsTo(() => MedioPago)
  medioPagoId: number;

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
