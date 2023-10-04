import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model({
  settings: {
    foreignKeys: {
      fk_bloqueo_cliente_clienteId: {
        name: 'fk_bloqueo_cliente_clienteId',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId'
      }
    }
  }
})
export class BloqueoCliente extends Entity {
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
  comentario: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<BloqueoCliente>) {
    super(data);
  }
}

export interface BloqueoClienteRelations {
  // describe navigational properties here
}

export type BloqueoClienteWithRelations = BloqueoCliente & BloqueoClienteRelations;
