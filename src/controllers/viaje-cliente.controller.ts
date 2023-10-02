import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Viaje,
  Cliente,
} from '../models';
import {ViajeRepository} from '../repositories';

export class ViajeClienteController {
  constructor(
    @repository(ViajeRepository)
    public viajeRepository: ViajeRepository,
  ) { }

  @get('/viajes/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Viaje',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof Viaje.prototype.id,
  ): Promise<Cliente> {
    return this.viajeRepository.cliente(id);
  }
}
