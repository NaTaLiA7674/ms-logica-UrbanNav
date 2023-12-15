import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import {BloqueoConductor} from './bloqueo-conductor.model';
import {BotonPanico} from './boton-panico.model';
import {CalificacionCliente} from './calificacion-cliente.model';
import {CalificacionConductor} from './calificacion-conductor.model';
import {Licencia} from './licencia.model';
import {UbicacionConductor} from './ubicacion-conductor.model';
import {Vehiculo} from './vehiculo.model';
import {Viaje} from './viaje.model';

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

  @property({
    type: 'string',
  })
  correo?: string;

  @property({
    type: 'string',
  })
  celular?: string;

  @property({
    type: 'boolean',
  })
  estado?: boolean;

  @property({
    type: 'boolean',
  })
  bloqueado?: boolean;

  @belongsTo(() => Vehiculo)
  vehiculoId: number;

  @belongsTo(() => Licencia)
  licenciaId: number;

  @hasMany(() => Viaje)
  viaje: Viaje[];

  @hasMany(() => BloqueoConductor)
  bloqueoConductor: BloqueoConductor[];

  @hasMany(() => CalificacionCliente)
  calificacionCliente: CalificacionCliente[];

  @hasMany(() => CalificacionConductor)
  calificacionConductor: CalificacionConductor[];

  @hasMany(() => BotonPanico)
  botonPanico: BotonPanico[];

  @hasMany(() => UbicacionConductor)
  ubicacionConductor: UbicacionConductor[];

  constructor(data?: Partial<Conductor>) {
    super(data);
  }
}

export interface ConductorRelations {
  // describe navigational properties here
}

export type ConductorWithRelations = Conductor & ConductorRelations;
