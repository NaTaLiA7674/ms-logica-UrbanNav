import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Conductor} from './conductor.model';

@model({
  settings: {
    foreignKeys: {
      fk_estado_conductor_conductorId: {
        name: 'fk_estado_conductor_conductorId',
        entity: 'Conductor',
        entityKey: 'id',
        foreignKey: 'conductorId',
      },
    },
  },
})
export class EstadoConductor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  disponible: boolean;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @belongsTo(() => Conductor)
  conductorId: number;

  constructor(data?: Partial<EstadoConductor>) {
    super(data);
  }
}

export interface EstadoConductorRelations {
  // describe navigational properties here
}

export type EstadoConductorWithRelations = EstadoConductor & EstadoConductorRelations;
