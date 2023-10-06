import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Conductor} from './conductor.model';
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
      fk_calificacion_conductor_clienteId: {
        name: 'fk_calificacion_conductor_clienteId',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId',
      },
      fk_calificacion_conductor_conductorId: {
        name: 'fk_calificacion_conductor_conductorId',
        entity: 'Conductor',
        entityKey: 'id',
        foreignKey: 'conductorId',
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
  fecha: Date;

  @property({
    type: 'string',
    required: true,
  })
  comentario: string;

  @belongsTo(() => Viaje)
  viajeId: number;

  @belongsTo(() => Cliente)
  clienteId: number;

  @belongsTo(() => Conductor)
  conductorId: number;

  constructor(data?: Partial<CalificacionConductor>) {
    super(data);
  }
}

export interface CalificacionConductorRelations {
  // describe navigational properties here
}

export type CalificacionConductorWithRelations = CalificacionConductor & CalificacionConductorRelations;
