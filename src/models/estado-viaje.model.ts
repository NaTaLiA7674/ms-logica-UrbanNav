import {Entity, model, property} from '@loopback/repository';

@model()
export class EstadoViaje extends Entity {
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
  descripcion: string;


  constructor(data?: Partial<EstadoViaje>) {
    super(data);
  }
}

export interface EstadoViajeRelations {
  // describe navigational properties here
}

export type EstadoViajeWithRelations = EstadoViaje & EstadoViajeRelations;
