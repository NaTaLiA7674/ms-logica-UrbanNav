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
  CalificacionCliente,
} from '../models';
import {ViajeRepository} from '../repositories';

export class ViajeCalificacionClienteController {
  constructor(
    @repository(ViajeRepository)
    public viajeRepository: ViajeRepository,
  ) { }

  @get('/viajes/{id}/calificacion-cliente', {
    responses: {
      '200': {
        description: 'CalificacionCliente belonging to Viaje',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CalificacionCliente),
          },
        },
      },
    },
  })
  async getCalificacionCliente(
    @param.path.number('id') id: typeof Viaje.prototype.id,
  ): Promise<CalificacionCliente> {
    return this.viajeRepository.calificacionCliente(id);
  }
}
