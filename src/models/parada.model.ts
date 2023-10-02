import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Distancias} from './distancias.model';
import {Viaje} from './viaje.model';

@model()
export class Parada extends Entity {
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
  nombreParada: string;

  @property({
    type: 'string',
    required: true,
  })
  ubicacionParada: string;

  @property({
    type: 'string',
  })
  informacionAdicional?: string;

  @belongsTo(() => Ciudad)
  ciudadId: number;

  @belongsTo(() => Distancias, {name: 'distancia'})
  distanciasId: number;

  @property({
    type: 'number',
  })
  idPuntoOrigen?: number;

  @hasMany(() => Viaje)
  viaje: Viaje[];

  constructor(data?: Partial<Parada>) {
    super(data);
  }
}

export interface ParadaRelations {
  // describe navigational properties here
}

export type ParadaWithRelations = Parada & ParadaRelations;
