import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Conductor} from './conductor.model';

@model()
export class Licencia extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  //Realizar la relacion con el modelo Conductor para nombre y apellido

  @property({
    type: 'date',
    required: true,
  })
  vigencia: string;

  @belongsTo(() => Conductor)
  conductorId: number;
  @property({
    type: 'string',
    required: true,
  })
  restricciones: string;



  constructor(data?: Partial<Licencia>) {
    super(data);
  }
}

export interface LicenciaRelations {
  // describe navigational properties here
}

export type LicenciaWithRelations = Licencia & LicenciaRelations;
