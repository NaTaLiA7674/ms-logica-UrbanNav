import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import {CalificacionCliente} from './calificacion-cliente.model';
import {CalificacionConductor} from './calificacion-conductor.model';
import {Cliente} from './cliente.model';
import {Conductor} from './conductor.model';
import {EstadoViaje} from './estado-viaje.model';
import {Factura} from './factura.model';
import {Parada} from './parada.model';
import {BotonPanico} from './boton-panico.model';

@model({
  settings: {
    foreignKeys: {
      fk_viaje_clienteId: {
        name: 'fk_viaje_clienteId',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId',
      },
      fk_viaje_conductorId: {
        name: 'fk_viaje_conductorId',
        entity: 'Conductor',
        entityKey: 'id',
        foreignKey: 'conductorId',
      },
      fk_viaje_puntoOrigenId: {
        name: 'fk_viaje_puntoOrigenId',
        entity: 'Parada',
        entityKey: 'id',
        foreignKey: 'puntoOrigenId',
      },
      fk_viaje_puntoDestinoId: {
        name: 'fk_viaje_puntoDestinoId',
        entity: 'Parada',
        entityKey: 'id',
        foreignKey: 'puntoDestinoId',
      },
    },
  },
})
export class Viaje extends Entity {
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

  @belongsTo(() => Parada)
  puntoOrigenId: number;

  @belongsTo(() => Parada)
  puntoDestinoId: number;

  @property({
    type: 'number',
  })
  paradaId?: number;
  estado: string;

  @belongsTo(() => BotonPanico)
  botonPanicoId: number;

  constructor(data?: Partial<Viaje>) {
    super(data);
  }
}

export interface ViajeRelations {
  // describe navigational properties here
}

export type ViajeWithRelations = Viaje & ViajeRelations;
