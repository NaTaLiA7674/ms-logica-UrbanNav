import {Entity, model, property} from '@loopback/repository';

@model()
export class EstadoConductor extends Entity {
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
  descripcion: string;


  constructor(data?: Partial<EstadoConductor>) {
    super(data);
  }
}

export interface EstadoConductorRelations {
  // describe navigational properties here
}

export type EstadoConductorWithRelations = EstadoConductor & EstadoConductorRelations;
