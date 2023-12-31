import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Conductor} from './conductor.model';

@model({
  settings: {
    foreignKeys: {
      fk_licencia_conductorId: {
        name: 'fk_licencia_conductorId',
        entity: 'Conductor',
        entityKey: 'id',
        foreignKey: 'conductorId',
      },
    },
  },
})
export class Licencia extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  vigencia: Date;

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
