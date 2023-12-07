import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Conductor} from './conductor.model';
import {Parada} from './parada.model';

@model()
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
