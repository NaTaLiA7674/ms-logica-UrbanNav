import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Parada} from './parada.model';

@model({
  settings: {
    foreignKeys: {
      fk_distancia_origenId: {
        name: 'fk_distancia_origenId',
        entity: 'Parada',
        entityKey: 'id',
        foreignKey: 'origenId',
      },
      fk_distancia_destinoId: {
        name: 'fk_distancia_destinoId',
        entity: 'Parada',
        entityKey: 'id',
        foreignKey: 'destinoId',
      },
    },
  },
})
export class Distancias extends Entity {
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
  kilometros: number;

  @property({
    type: 'number',
  })
  tiempoEstimado?: number;

  @belongsTo(() => Parada)
  origenId: number;

  @belongsTo(() => Parada)
  destinoId: number;

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
