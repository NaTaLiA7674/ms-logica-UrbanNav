import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Viaje} from './viaje.model';
import {Distancias} from './distancias.model';

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

  @property({
    type: 'number',
  })
  idPuntoOrigen?: number;

  @hasMany(() => Viaje)
  viaje: Viaje[];

  @property({
    type: 'number',
  })
  distanciasId?: number;

  @hasMany(() => Distancias)
  distancia: Distancias[];

  constructor(data?: Partial<Parada>) {
    super(data);
  }
}

export interface ParadaRelations {
  // describe navigational properties here
}

export type ParadaWithRelations = Parada & ParadaRelations;
