import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Conductor, EstadoViaje, Viaje} from '../models';
import {ConductorRepository, EstadoViajeRepository, ViajeRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class SolicitudViajeService {
  constructor(
    @repository(ViajeRepository)
    public viajeRepository: ViajeRepository,
    @repository(ConductorRepository)
    public conductorRepository: ConductorRepository,
    @repository(EstadoViajeRepository)
    public estadoViajeRepository: EstadoViajeRepository,
  ) {}

  async asignarConductor(solicitudId: number, conductorId: number): Promise<void> {
    // Verificar si la solicitud de viaje y el conductor existen
    const solicitud: Viaje = await this.viajeRepository.findById(solicitudId);
    const conductor: Conductor = await this.conductorRepository.findById(conductorId);

    if (!solicitud || !conductor) {
      throw new Error('Solicitud de viaje o conductor no encontrados');
    }

    // Verificar si la solicitud está pendiente y el conductor no está asignado a otra solicitud
    if (solicitud.estado !== 'pendiente' || solicitud.conductorId) {
      throw new Error('La solicitud ya ha sido asignada o no está pendiente');
    }

    // Crear un nuevo estado de viaje para representar la asignación del conductor
    const estadoAsignado: EstadoViaje = new EstadoViaje({
      estado: 'aceptada', // Cambiar el estado del viaje a 'aceptada'
      comentario: `Viaje asignado al conductor ${conductorId}`,
      fecha: new Date().toISOString(),
      viajeId: solicitud.id,
    });

    // Actualizar la solicitud con el ID del conductor asignado y cambiar el estado a 'aceptada'
    solicitud.conductorId = conductorId;
    solicitud.estado = 'aceptada';

    // Actualizar la solicitud y crear el estado de viaje en la base de datos
    await this.viajeRepository.update(solicitud);
    await this.estadoViajeRepository.create(estadoAsignado);
  }
}
