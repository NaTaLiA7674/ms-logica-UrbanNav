import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {MedioPago} from './medio-pago.model';
import {Viaje} from './viaje.model';

@model({
  settings: {
    foreignKeys: {
      fk_factura_viajeId: {
        name: 'fk_factura_viajeId',
        entity: 'Viaje',
        entityKey: 'id',
        foreignKey: 'viajeId',
      },
      fk_factura_medio_pagoId: {
        name: 'fk_factura_medio_pagoId',
        entity: 'MedioPago',
        entityKey: 'id',
        foreignKey: 'medioPagoId',
      },
      fk_factura_clienteId: {
        name: 'fk_factura_clienteId',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId',
      },
    },
  },
})
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
