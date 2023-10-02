import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  MedioPago,
  Factura,
} from '../models';
import {MedioPagoRepository} from '../repositories';

export class MedioPagoFacturaController {
  constructor(
    @repository(MedioPagoRepository) protected medioPagoRepository: MedioPagoRepository,
  ) { }

  @get('/medio-pagos/{id}/facturas', {
    responses: {
      '200': {
        description: 'Array of MedioPago has many Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Factura>,
  ): Promise<Factura[]> {
    return this.medioPagoRepository.factura(id).find(filter);
  }

  @post('/medio-pagos/{id}/facturas', {
    responses: {
      '200': {
        description: 'MedioPago model instance',
        content: {'application/json': {schema: getModelSchemaRef(Factura)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof MedioPago.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFacturaInMedioPago',
            exclude: ['id'],
            optional: ['medioPagoId']
          }),
        },
      },
    }) factura: Omit<Factura, 'id'>,
  ): Promise<Factura> {
    return this.medioPagoRepository.factura(id).create(factura);
  }

  @patch('/medio-pagos/{id}/facturas', {
    responses: {
      '200': {
        description: 'MedioPago.Factura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Partial<Factura>,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.medioPagoRepository.factura(id).patch(factura, where);
  }

  @del('/medio-pagos/{id}/facturas', {
    responses: {
      '200': {
        description: 'MedioPago.Factura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.medioPagoRepository.factura(id).delete(where);
  }
}
