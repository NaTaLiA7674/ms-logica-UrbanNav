import {Entity, model, property} from '@loopback/repository';

@model()
export class CalificacionConductor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  puntuacion: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  comentario: string;


  constructor(data?: Partial<CalificacionConductor>) {
    super(data);
  }
}

export interface CalificacionConductorRelations {
  // describe navigational properties here
}

export type CalificacionConductorWithRelations = CalificacionConductor & CalificacionConductorRelations;
