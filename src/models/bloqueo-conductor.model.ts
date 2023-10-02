import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Conductor} from './conductor.model';

@model()
export class BloqueoConductor extends Entity {
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
  comentario: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @belongsTo(() => Conductor)
  conductorId: number;

  constructor(data?: Partial<BloqueoConductor>) {
    super(data);
  }
}

export interface BloqueoConductorRelations {
  // describe navigational properties here
}

export type BloqueoConductorWithRelations = BloqueoConductor & BloqueoConductorRelations;
