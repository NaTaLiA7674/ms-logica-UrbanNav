import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {Licencia} from './licencia.model';
import {Viaje} from './viaje.model';
import {EstadoConductor} from './estado-conductor.model';
import {BloqueoConductor} from './bloqueo-conductor.model';

@model()
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

  constructor(data?: Partial<Conductor>) {
    super(data);
  }
}

export interface ConductorRelations {
  // describe navigational properties here
}

export type ConductorWithRelations = Conductor & ConductorRelations;
