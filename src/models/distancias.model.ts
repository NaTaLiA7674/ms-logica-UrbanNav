import {Entity, model, property, hasMany} from '@loopback/repository';
import {Parada} from './parada.model';

@model()
export class Distancias extends Entity {
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
  origen: string;

  @property({
    type: 'string',
    required: true,
  })
  destino: string;

  @property({
    type: 'number',
    required: true,
  })
  kilometros: number;

  @property({
    type: 'number',
    required: true,
  })
  tiempoEstimado: number;

  @hasMany(() => Parada)
  parada: Parada[];

  @property({
    type: 'number',
  })
  paradaId?: number;

  constructor(data?: Partial<Distancias>) {
    super(data);
  }
}

export interface DistanciasRelations {
  // describe navigational properties here
}

export type DistanciasWithRelations = Distancias & DistanciasRelations;
