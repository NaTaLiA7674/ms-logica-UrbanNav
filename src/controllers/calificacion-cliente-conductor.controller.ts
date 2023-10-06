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
  Conductor,
} from '../models';
import {CalificacionClienteRepository} from '../repositories';

export class CalificacionClienteConductorController {
  constructor(
    @repository(CalificacionClienteRepository)
    public calificacionClienteRepository: CalificacionClienteRepository,
  ) { }

  @get('/calificacion-clientes/{id}/conductor', {
    responses: {
      '200': {
        description: 'Conductor belonging to CalificacionCliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Conductor),
          },
        },
      },
    },
  })
  async getConductor(
    @param.path.number('id') id: typeof CalificacionCliente.prototype.id,
  ): Promise<Conductor> {
    return this.calificacionClienteRepository.conductor(id);
  }
}
