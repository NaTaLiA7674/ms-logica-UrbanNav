import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import * as graphlib from 'graphlib';
import {EstadoViaje, Viaje} from '../models';
import {ClienteRepository, ConductorRepository, DistanciasRepository, EstadoViajeRepository, ParadaRepository, ViajeRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class SolicitudViajeService {
  constructor(
    @repository(ViajeRepository)
    public viajeRepository: ViajeRepository,
    @repository(ConductorRepository)
    public conductorRepository: ConductorRepository,
    @repository(EstadoViajeRepository)
    public estadoViajeRepository: EstadoViajeRepository,
    @repository(ParadaRepository)
    public paradaRepository: ParadaRepository,
    @repository(DistanciasRepository)
    public distanciasRepository: DistanciasRepository,
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }


  // Función para asignar un conductor a una solicitud de viaje
  async asignarConductor(solicitudId: number): Promise<void> {
    // Verificar si la solicitud de viaje existe
    const solicitud: Viaje = await this.viajeRepository.findById(solicitudId);

    if (!solicitud) {
      throw new Error('Solicitud de viaje no encontrada');
    }

    // Verificar si la solicitud está pendiente y el conductor no está asignado a otra solicitud
    if (solicitud.estado !== 'pendiente' || solicitud.conductorId) {
      throw new Error('La solicitud ya ha sido asignada o no está pendiente');
    }

    // Cambiar el estado del viaje a 'aceptada'
    solicitud.estado = 'aceptada';

    // Actualizar la solicitud y crear el estado de viaje en la base de datos
    await this.viajeRepository.update(solicitud);

    // Aquí puedes notificar a todos los conductores de la nueva solicitud de viaje
    // Esto dependerá de cómo implementas la notificación a los conductores en tu aplicación.

    // Puedes agregar código para notificar a los conductores de la nueva solicitud y permitirles aceptarla.
    // Cuando un conductor acepta la solicitud, actualizas el campo conductorId en la solicitud.

    // Si un conductor acepta la solicitud, actualiza solicitud.conductorId = conductorId;

    // Puedes implementar una lógica para que un conductor acepte la solicitud y actualices solicitud.conductorId en ese punto.

    // Si un conductor acepta la solicitud, crea un registro en el historial de estados de viaje.

    // Puedes registrar un nuevo estado de viaje para reflejar la aceptación por parte del conductor.

    // Recuerda manejar correctamente la lógica de notificación y aceptación por parte de los conductores.

    // Esta parte dependerá de cómo implementas la asignación de conductores en tu sistema.
  }

  //Función para crear el grafo de viajes utilizando paradas y distancias
  async crearGrafoViajes(): Promise<graphlib.Graph> {
    const grafo = new graphlib.Graph({directed: true});

    //Obtener datos de paradas desde el modelo de parada
    const paradas = await this.paradaRepository.find();

    //Obtener datos de distancias desde el modelo de distancias
    const distancias = await this.distanciasRepository.find();

    //Agregar vértices al grafo
    paradas.forEach(parada => {
      grafo.setNode(parada.nombreParada);
    });

    //Agregar aristas con el valor del kilometraje al grafo
    distancias.forEach(distancia => {
      const origen = distancia.origenId.toString();
      const destino = distancia.destinoId.toString();
      const peso = distancia.kilometros.toString();
      grafo.setEdge(origen, destino, peso);
    });
    return grafo;
  }


  // Función para obtener el camino más corto entre el origen y el destino del modelo viaje
  async obtenerRutaMasCorta(origen: string, destino: string): Promise<string[]> {
    // Convertir origen y destino a números
    const origenNumero = Number(origen);
    const destinoNumero = Number(destino);

    // Obtener el viaje desde el modelo de viaje
    let viaje = await this.viajeRepository.findOne({where: {puntoOrigenId: origenNumero, puntoDestinoId: destinoNumero}});

    if (!viaje) {
      // crear un nuevo viaje en la base de datos con los valores proporcionados y luego continuar con la lógica de rutas
      const nuevoViaje = new Viaje({
        puntoOrigenId: origenNumero,
        puntoDestinoId: destinoNumero,
        estado: 'pendiente',
      });

      const nuevoViajeGuardado = await this.viajeRepository.create(nuevoViaje);
      //continuar con la logica de rutas utilizando el nuevo viaje
      viaje = nuevoViajeGuardado;
    }

    // Obtener el grafo dirigido previamente creado
    const grafo = await this.crearGrafoViajes(); // Reutiliza la función anterior

    // Lógica para encontrar la ruta más corta
    const visitados: {[key: string]: boolean} = {};
    const distancia: {[key: string]: number} = {};
    const ruta: {[key: string]: string} = {};

    for (const nodo of grafo.nodes()) {
      distancia[nodo] = Number.MAX_SAFE_INTEGER;
    }

    distancia[origen] = 0;

    for (let i = 0; i < grafo.nodeCount(); i++) {
      const nodoActual = await this.encontrarNodoNoVisitadoConMenorDistancia(grafo, visitados, distancia);
      visitados[nodoActual] = true;

      const vecinos = await grafo.successors(nodoActual); // Espera a que se resuelva la Promesa

      if (!Array.isArray(vecinos)) {
        throw new Error('Los vecinos no son una matriz de cadenas.');
      }

      for (const vecino of vecinos) {
        const peso = grafo.edge(nodoActual, vecino);
        const distanciaAcumulada = distancia[nodoActual] + peso;
        if (distanciaAcumulada < distancia[vecino]) {
          distancia[vecino] = distanciaAcumulada;
          ruta[vecino] = nodoActual;
        }
      }
    }

    const rutaMasCorta = await this.reconstruirRuta(origen, destino, ruta);
    const kmRecorrido = distancia[destino];
    const costo = kmRecorrido * 1000;

    // Actualizar el atributo kmRecorrido del modelo de viaje
    viaje.kmRecorrido = kmRecorrido;
    viaje.costo = costo;

    //Crear un nuevo estado de viaje para representar el cambio de estado:
    const nuevoEstado: EstadoViaje = new EstadoViaje({
      estado: 'en curso',
      comentario: `Viaje en curso`,
      fecha: new Date().toISOString(),
      viajeId: viaje.id,
    });

    //Guardar el nuevo estado de viaje en la base de datos
    await this.estadoViajeRepository.create(nuevoEstado);

    console.log(`Ruta más favorable de ${origen} a ${destino}: ${rutaMasCorta.join(' -> ')}`);

    return rutaMasCorta;
  }


  async encontrarNodoNoVisitadoConMenorDistancia(grafo: any, visitados: any, distancia: any): Promise<string> {
    let minDistancia = Number.MAX_SAFE_INTEGER;
    let nodoConMinDistancia: string | null = null;

    for (const nodo of grafo.nodes()) {
      if (!visitados[nodo] && distancia[nodo] < minDistancia) {
        minDistancia = distancia[nodo];
        nodoConMinDistancia = nodo;
      }
    }

    if (nodoConMinDistancia) {
      return nodoConMinDistancia;
    } else {
      throw new Error('No se encontró una ruta desde el origen al destino');
    }
  }

  async reconstruirRuta(origen: string, destino: string, ruta: any): Promise<string[]> {
    const rutaMasCorta: string[] = [];
    let nodoActual = destino;

    while (nodoActual !== origen) {
      rutaMasCorta.unshift(nodoActual);
      nodoActual = ruta[nodoActual];
    }

    rutaMasCorta.unshift(origen);
    return rutaMasCorta;
  }

  //Funcionalidad de botón de pánico que envía un mensaje de alerta a un contacto de emergencia configurado en el modelo del cliente
  async enviarAlertaPanic(clienteId: number): Promise<void> {
    //Obtener el cliente desde el modelo de cliente
    const cliente = await this.clienteRepository.findById(clienteId);

    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }

    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }

    //Enviar un mensaje de alerta al contacto de emergencia del cliente
    //Funcionalidad con el ms-notificaciones para enviar el mensaje de alerta
    console.log(`Enviando mensaje de alerta a ${cliente.contactoEmergenciaNombre}`);
  }
}
