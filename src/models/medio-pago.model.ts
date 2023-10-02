import {Entity, model, property, hasMany} from '@loopback/repository';
import {Factura} from './factura.model';
import {Cliente} from './cliente.model';

@model()
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
