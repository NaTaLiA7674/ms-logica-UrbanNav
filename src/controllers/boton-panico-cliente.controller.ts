import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  BotonPanico,
  Cliente,
} from '../models';
import {BotonPanicoRepository} from '../repositories';

export class BotonPanicoClienteController {
  constructor(
    @repository(BotonPanicoRepository)
    public botonPanicoRepository: BotonPanicoRepository,
  ) { }

  @get('/boton-panicos/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to BotonPanico',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof BotonPanico.prototype.id,
  ): Promise<Cliente> {
    return this.botonPanicoRepository.cliente(id);
  }
}
