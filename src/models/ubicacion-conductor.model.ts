import {Entity, model, property} from '@loopback/repository';

@model()
export class UbicacionConductor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  conductorId?: number;

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
