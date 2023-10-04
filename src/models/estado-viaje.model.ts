import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Viaje} from './viaje.model';

@model({
  settings: {
    foreignKeys: {
      fk_estado_viaje_viajeId: {
        name: 'fk_estado_viaje_viajeId',
        entity: 'Viaje',
        entityKey: 'id',
        foreignKey: 'viajeId',
      },
    },
  },
})
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
