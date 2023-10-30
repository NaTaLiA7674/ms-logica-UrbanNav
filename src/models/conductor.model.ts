import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import {BloqueoConductor} from './bloqueo-conductor.model';
import {BotonPanico} from './boton-panico.model';
import {CalificacionCliente} from './calificacion-cliente.model';
import {CalificacionConductor} from './calificacion-conductor.model';
import {EstadoConductor} from './estado-conductor.model';
import {Licencia} from './licencia.model';
import {Vehiculo} from './vehiculo.model';
import {Viaje} from './viaje.model';
import {Parada} from './parada.model';
import {UbicacionConductor} from './ubicacion-conductor.model';

@model({
  settings: {
    foreignKeys: {
      fk_conductor_vehiculoId: {
        name: 'fk_conductor_vehiculoId',
        entity: 'Vehiculo',
        entityKey: 'id',
        foreignKey: 'vehiculoId',
      },
      fk_conductor_licenciaId: {
        name: 'fk_conductor_licenciaId',
        entity: 'Licencia',
        entityKey: 'id',
        foreignKey: 'licenciaId',
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

  @property({
    type: 'string',
  })
  correo?: string;

  @property({
    type: 'string',
  })
  celular?: string;

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

  @hasMany(() => Parada, {through: {model: () => UbicacionConductor}})
  paradaCercana: Parada[];

  constructor(data?: Partial<Conductor>) {
    super(data);
  }
}

export interface ConductorRelations {
  // describe navigational properties here
}

export type ConductorWithRelations = Conductor & ConductorRelations;
