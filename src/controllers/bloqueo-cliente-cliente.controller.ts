import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  BloqueoCliente,
  Cliente,
} from '../models';
import {BloqueoClienteRepository} from '../repositories';

export class BloqueoClienteClienteController {
  constructor(
    @repository(BloqueoClienteRepository)
    public bloqueoClienteRepository: BloqueoClienteRepository,
  ) { }

  @get('/bloqueo-clientes/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to BloqueoCliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof BloqueoCliente.prototype.id,
  ): Promise<Cliente> {
    return this.bloqueoClienteRepository.cliente(id);
  }
}
