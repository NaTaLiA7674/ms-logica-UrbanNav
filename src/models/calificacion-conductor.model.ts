import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Viaje} from './viaje.model';

@model({
  settings: {
    foreignKeys: {
      fk_calificacion_conductor_viajeId: {
        name: 'fk_calificacion_conductor_viajeId',
        entity: 'Viaje',
        entityKey: 'id',
        foreignKey: 'viajeId',
      },
    },
  },
})
export class CalificacionConductor extends Entity {
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
  puntuacion: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  comentario: string;

  @belongsTo(() => Viaje)
  viajeId: number;

  constructor(data?: Partial<CalificacionConductor>) {
    super(data);
  }
}

export interface CalificacionConductorRelations {
  // describe navigational properties here
}

export type CalificacionConductorWithRelations = CalificacionConductor & CalificacionConductorRelations;
