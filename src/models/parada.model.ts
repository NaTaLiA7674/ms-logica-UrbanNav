import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Distancias} from './distancias.model';
import {Viaje} from './viaje.model';

@model({
  settings: {
    foreignKeys: {
      fk_parada_ubicacionId: {
        name: 'fk_parada_ubicacionId',
        entity: 'Ciudad',
        entityKey: 'id',
        foreignKey: 'ubicacionId',
      },
    },
  },
})
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
  })
  informacionAdicional?: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @belongsTo(() => Ciudad)
  ubicacionId: number;

  @hasMany(() => Viaje)
  viaje: Viaje[];

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
