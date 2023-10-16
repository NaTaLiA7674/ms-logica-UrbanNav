import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import {BloqueoConductor} from './bloqueo-conductor.model';
import {CalificacionCliente} from './calificacion-cliente.model';
import {CalificacionConductor} from './calificacion-conductor.model';
import {EstadoConductor} from './estado-conductor.model';
import {Licencia} from './licencia.model';
import {Vehiculo} from './vehiculo.model';
import {Viaje} from './viaje.model';
import {BotonPanico} from './boton-panico.model';

@model({
  settings: {
    foreignKeys: {
      fk_conductor_vehiculoId: {
        name: 'fk_conductor_vehiculoId',
        entity: 'Vehiculo',
        entityKey: 'id',
        foreignKey: 'vehiculoId',
      },
    },
  },
})
export class Conductor extends Entity {
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

  @belongsTo(() => Vehiculo)
  vehiculoId: number;

  @belongsTo(() => Licencia)
  licenciaId: number;

  @hasMany(() => Viaje)
  viaje: Viaje[];

  @hasMany(() => EstadoConductor)
  estadoConductor: EstadoConductor[];

  @hasMany(() => BloqueoConductor)
  bloqueoConductor: BloqueoConductor[];

  @hasMany(() => CalificacionCliente)
  calificacionCliente: CalificacionCliente[];

  @hasMany(() => CalificacionConductor)
  calificacionConductor: CalificacionConductor[];

  @hasMany(() => BotonPanico)
  botonPanico: BotonPanico[];

  constructor(data?: Partial<Conductor>) {
    super(data);
  }
}

export interface ConductorRelations {
  // describe navigational properties here
}

export type ConductorWithRelations = Conductor & ConductorRelations;
