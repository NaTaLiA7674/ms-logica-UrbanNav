import {Entity, model, property, hasMany} from '@loopback/repository';
import {Viaje} from './viaje.model';
import {Factura} from './factura.model';
import {MedioPago} from './medio-pago.model';
import {BloqueoCliente} from './bloqueo-cliente.model';

@model()
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

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
