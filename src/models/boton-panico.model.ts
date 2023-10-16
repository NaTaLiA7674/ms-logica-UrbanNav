import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Conductor} from './conductor.model';
import {Viaje} from './viaje.model';

@model({
  settings: {
    foreignKeys: {
      fk_cliente_id: {
        name: 'fk_cliente_id',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId',
      },
      fk_conductor_id: {
        name: 'fk_conductor_id',
        entity: 'Conductor',
        entityKey: 'id',
        foreignKey: 'conductorId',
      },
      fk_viaje_id: {
        name: 'fk_viaje_id',
        entity: 'Viaje',
        entityKey: 'id',
        foreignKey: 'viajeId',
      },
    },
  },
})
export class BotonPanico extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
  })
  comentario?: string;

  @belongsTo(() => Cliente)
  clienteId: number;

  @belongsTo(() => Conductor)
  conductorId: number;

  @belongsTo(() => Viaje)
  viajeId: number;

  constructor(data?: Partial<BotonPanico>) {
    super(data);
  }
}

export interface BotonPanicoRelations {
  // describe navigational properties here
}

export type BotonPanicoWithRelations = BotonPanico & BotonPanicoRelations;
