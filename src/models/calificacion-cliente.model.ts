import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Viaje} from './viaje.model';
import {Cliente} from './cliente.model';
import {Conductor} from './conductor.model';

@model({
  settings: {
    foreignKeys: {
      fk_calificacion_cliente_viajeId: {
        name: 'fk_calificacion_cliente_viajeId',
        entity: 'Viaje',
        entityKey: 'id',
        foreignKey: 'viajeId'
      }
    }
  }
})
export class CalificacionCliente extends Entity {
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
  puntuacion: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: Date;

  @property({
    type: 'string',
    required: true,
  })
  comentario: string;

  @belongsTo(() => Viaje)
  viajeId: number;

  @belongsTo(() => Cliente)
  clienteId: number;

  @belongsTo(() => Conductor)
  conductorId: number;

  constructor(data?: Partial<CalificacionCliente>) {
    super(data);
  }
}

export interface CalificacionClienteRelations {
  // describe navigational properties here
}

export type CalificacionClienteWithRelations = CalificacionCliente & CalificacionClienteRelations;
