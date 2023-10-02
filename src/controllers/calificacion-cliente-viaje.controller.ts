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
  Viaje,
} from '../models';
import {CalificacionClienteRepository} from '../repositories';

export class CalificacionClienteViajeController {
  constructor(
    @repository(CalificacionClienteRepository)
    public calificacionClienteRepository: CalificacionClienteRepository,
  ) { }

  @get('/calificacion-clientes/{id}/viaje', {
    responses: {
      '200': {
        description: 'Viaje belonging to CalificacionCliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Viaje),
          },
        },
      },
    },
  })
  async getViaje(
    @param.path.number('id') id: typeof CalificacionCliente.prototype.id,
  ): Promise<Viaje> {
    return this.calificacionClienteRepository.viaje(id);
  }
}
