import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Viaje} from './viaje.model';

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
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  comentario: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @belongsTo(() => Viaje)
  viajeId: number;

  constructor(data?: Partial<EstadoViaje>) {
    super(data);
  }
}

export interface EstadoViajeRelations {
  // describe navigational properties here
}

export type EstadoViajeWithRelations = EstadoViaje & EstadoViajeRelations;
