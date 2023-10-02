import {Entity, model, property} from '@loopback/repository';

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
