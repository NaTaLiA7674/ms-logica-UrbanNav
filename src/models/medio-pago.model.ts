import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<MedioPago>) {
    super(data);
  }
}

export interface MedioPagoRelations {
  // describe navigational properties here
}

export type MedioPagoWithRelations = MedioPago & MedioPagoRelations;
