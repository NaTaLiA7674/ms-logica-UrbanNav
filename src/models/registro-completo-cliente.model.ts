import {Model, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {MedioPago} from './medio-pago.model';

@model()
export class RegistroCompletoCliente extends Model {
  @property({
    type: 'object',
    required: true,
  })
  cliente: Cliente;

  @property({
    type: 'object',
    required: true,
  })
  medioPago: MedioPago;


  constructor(data?: Partial<RegistroCompletoCliente>) {
    super(data);
  }
}

export interface RegistroCompletoClienteRelations {
  // describe navigational properties here
}

export type RegistroCompletoClienteWithRelations = RegistroCompletoCliente & RegistroCompletoClienteRelations;
