import {Entity, hasMany, model, property} from '@loopback/repository';
import {BloqueoCliente} from './bloqueo-cliente.model';
import {Factura} from './factura.model';
import {MedioPago} from './medio-pago.model';
import {Viaje} from './viaje.model';
import {CalificacionCliente} from './calificacion-cliente.model';
import {CalificacionConductor} from './calificacion-conductor.model';

@model({
  settings: {
    foreignKeys: {
      fk_cliente_medio_pagoId: {
        name: 'fk_cliente_medio_pagoId',
        entity: 'MedioPago',
        entityKey: 'id',
        foreignKey: 'medioPagoId',
      },
    },
  },
})
export class Cliente extends Entity {
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
  primerNombre: string;

  @property({
    type: 'string',
  })
  segundoNombre?: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;

  @property({
    type: 'string',
  })
  segundoApellido?: string;

  @hasMany(() => Viaje)
  viaje: Viaje[];

  @hasMany(() => Factura)
  factura: Factura[];

  @hasMany(() => MedioPago)
  medioPago: MedioPago[];

  @property({
    type: 'number',
  })
  medioPagoId?: number;

  @hasMany(() => BloqueoCliente)
  bloqueoCliente: BloqueoCliente[];

  @hasMany(() => CalificacionCliente)
  calificacionCliente: CalificacionCliente[];

  @hasMany(() => CalificacionConductor)
  calificacionConductor: CalificacionConductor[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
