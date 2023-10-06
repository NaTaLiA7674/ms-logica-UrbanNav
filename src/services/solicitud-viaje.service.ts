import {injectable} from '@loopback/core';
import {AsignacionConductorService} from './asignacion-conductor.service';
import {ParadaService} from './parada.service';

@injectable()
export class SolicitudViajeService {
  public origenId: any
  public destinoId: number
  public clienteId: any
  public informacionAdicional: any
  constructor() { }

  async crearSolicitudViaje(origenId: any, destinoId: number, clienteId: any, informacionAdicional: any) {
    const origen = ParadaService.obtenerParadaPorId(origenId);
    const destino = ParadaService.obtenerParadaPorId(destinoId);
    const distanciasEntreParadas = ParadaService.obtenerDistanciasEntreParadas(origenId, destinoId);
    const distanciaTotal = ParadaService.calcularDistanciaTotal(distanciasEntreParadas);

    //Esto va en la parte de facturas
    const precioPorKilometro = 1.5; // Precio por kilómetro recorrido (puedes ajustarlo según tus necesidades)
    const costoViaje = distanciaTotal * precioPorKilometro;

    const conductorAsignado = await AsignacionConductorService.asignarConductor(origenId);

    const solicitudViaje = {
      origen: origen,
      destino: destino,
      clienteId: clienteId,
      informacionAdicional: informacionAdicional,
      distanciaTotal: distanciaTotal,
      costo: costoViaje,
      conductorAsignado: conductorAsignado,
      estado: 'pendiente' // O cualquier otro estado inicial que desees utilizar
    };

    // Guardar la solicitud en la base de datos o cualquier otro almacenamiento necesario
    // Lógica para guardar la solicitud en la base de datos

    return solicitudViaje;
  }
}

