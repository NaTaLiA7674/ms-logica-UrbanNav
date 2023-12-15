import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Conductor} from './conductor.model';
import {Parada} from './parada.model';

@model({
  settings: {
    foreignKeys: {
      fk_ubicacion_conductor_conductorId: {
        name: 'fk_ubicacion_conductor_conductorId',
        entity: 'Conductor',
        entityKey: 'id',
        foreignKey: 'conductorId',
      },
      fk_ubicacion_conductor_origenId: {
        name: 'fk_ubicacion_conductor_origenId',
        entity: 'Parada',
        entityKey: 'id',
        foreignKey: 'origenId',
      }
    },
  },
})
export class UbicacionConductor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Conductor)
  conductorId: number;

  @belongsTo(() => Parada)
  origenId: number;

  @property({
    type: 'number',
  })
  paradaId?: number;

  constructor(data?: Partial<UbicacionConductor>) {
    super(data);
  }
}

export interface UbicacionConductorRelations {
  // describe navigational properties here
}

export type UbicacionConductorWithRelations = UbicacionConductor & UbicacionConductorRelations;
