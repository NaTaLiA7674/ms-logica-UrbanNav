import {Entity, hasMany, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Factura} from './factura.model';

@model({
  settings: {
    foreignKeys: {
      fk_medio_pago_clienteId: {
        name: 'fk_medio_pago_clienteId',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId',
      },
    },
  },
})
export class MedioPago extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  detallesMedioPago: string;

  @hasMany(() => Factura)
  factura: Factura[];

  @property({
    type: 'number',
  })
  clienteId?: number;

  @hasMany(() => Cliente)
  cliente: Cliente[];

  constructor(data?: Partial<MedioPago>) {
    super(data);
  }
}

export interface MedioPagoRelations {
  // describe navigational properties here
}

export type MedioPagoWithRelations = MedioPago & MedioPagoRelations;
