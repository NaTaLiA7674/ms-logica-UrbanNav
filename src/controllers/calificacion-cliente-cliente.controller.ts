import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CalificacionCliente,
  Cliente,
} from '../models';
import {CalificacionClienteRepository} from '../repositories';

export class CalificacionClienteClienteController {
  constructor(
    @repository(CalificacionClienteRepository)
    public calificacionClienteRepository: CalificacionClienteRepository,
  ) { }

  @get('/calificacion-clientes/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to CalificacionCliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof CalificacionCliente.prototype.id,
  ): Promise<Cliente> {
    return this.calificacionClienteRepository.cliente(id);
  }
}
