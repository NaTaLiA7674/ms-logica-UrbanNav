import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CalificacionConductor,
  Cliente,
} from '../models';
import {CalificacionConductorRepository} from '../repositories';

export class CalificacionConductorClienteController {
  constructor(
    @repository(CalificacionConductorRepository)
    public calificacionConductorRepository: CalificacionConductorRepository,
  ) { }

  @get('/calificacion-conductors/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to CalificacionConductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof CalificacionConductor.prototype.id,
  ): Promise<Cliente> {
    return this.calificacionConductorRepository.cliente(id);
  }
}
