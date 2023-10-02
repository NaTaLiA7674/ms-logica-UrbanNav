import {Entity, belongsTo, model, property, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {CalificacionConductor} from './calificacion-conductor.model';
import {CalificacionCliente} from './calificacion-cliente.model';
import {Factura} from './factura.model';
import {Conductor} from './conductor.model';
import {EstadoViaje} from './estado-viaje.model';
import {Parada} from './parada.model';

@model()
export class Viaje extends Entity {
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
  costo: number;

  @property({
    type: 'number',
    required: true,
  })
  kmRecorrido: number;

  @belongsTo(() => Cliente)
  clienteId: number;

  @belongsTo(() => CalificacionConductor)
  calificacionConductorId: number;

  @belongsTo(() => CalificacionCliente)
  calificacionClienteId: number;

  @belongsTo(() => Factura)
  facturaId: number;

  @belongsTo(() => Conductor)
  conductorId: number;

  @hasMany(() => EstadoViaje)
  estadoViaje: EstadoViaje[];

  @hasMany(() => Parada, {keyTo: 'idPuntoOrigen'})
  idPuntoDestino: Parada[];

  @property({
    type: 'number',
  })
  paradaId?: number;

  constructor(data?: Partial<Viaje>) {
    super(data);
  }
}

export interface ViajeRelations {
  // describe navigational properties here
}

export type ViajeWithRelations = Viaje & ViajeRelations;
