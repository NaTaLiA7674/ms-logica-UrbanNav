import {Model, model, property} from '@loopback/repository';
import {Conductor} from './conductor.model';
import {Licencia} from './licencia.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class RegistroCompletoConductor extends Model {
  @property({
    type: 'object',
    required: true,
  })
  conductor: Conductor;

  @property({
    type: 'object',
    required: true,
  })
  vehiculo: Vehiculo;

  @property({
    type: 'object',
    required: true,
  })
  licencia: Licencia;


  constructor(data?: Partial<RegistroCompletoConductor>) {
    super(data);
  }
}

export interface RegistroCompletoConductorRelations {
  // describe navigational properties here
}

export type RegistroCompletoConductorWithRelations = RegistroCompletoConductor & RegistroCompletoConductorRelations;
