import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Arista} from '../grafo/arista';
import {Grafo} from '../grafo/grafo';
import {Nodo} from '../grafo/nodo';
import {Viaje} from '../models';
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

  async crearGrafo(): Promise<Grafo> {
    const paradas = await this.paradaRepository.find();
    const nodos: Nodo[] = [];

    for await (const parada of paradas) {
      const distancias = await this.distanciasRepository.find({where: {origenId: parada.id!}});
      const aristas: Arista[] = [];
      //Convertir las distancias a aristas
      for await (const distancia of distancias) {
        const destino = await this.paradaRepository.findById(distancia.destinoId);
        //Convertir destino a nodo
        const nodo = new Nodo(destino.id!.toString(), destino.nombreParada, destino.clave);
        aristas.push(new Arista(nodo, distancia.kilometros));
      }

      nodos.push(new Nodo(parada.id!.toString(), parada.nombreParada, parada.clave, aristas));
    }

    return new Grafo(nodos);
  }

  async dijkstra(grafo: Grafo, origen: Nodo, destino: Nodo): Promise<Nodo[]> {
    const distancias: {[key: string]: number} = {};
    const previos: {[key: string]: Nodo | null} = {};
    const nodosNoVisitados: Nodo[] = [...grafo.getNodos()];

    // Inicializa las distancias con infinito y el nodo anterior con nulo
    for (const nodo of nodosNoVisitados) {
      distancias[nodo.getId()] = Infinity;
      previos[nodo.getId()] = null;
    }

    // La distancia al nodo de origen es 0
    distancias[origen.getId()] = 0;

    while (nodosNoVisitados.length > 0) {
      // Encuentra el nodo con la distancia mínima
      const nodoActual = nodosNoVisitados.reduce((minNodo, nodo) =>
        distancias[nodo.getId()] < distancias[minNodo.getId()] ? nodo : minNodo
      );

      // Elimina el nodo actual de la lista de nodos no visitados
      nodosNoVisitados.splice(nodosNoVisitados.indexOf(nodoActual), 1);

      // Si hemos encontrado el destino, reconstruye la ruta y devuélvela
      if (nodoActual === destino) {
        const ruta: Nodo[] = [];
        let nodo = destino;
        while (nodo !== null) {
          ruta.unshift(nodo);
          nodo = previos[nodo.getId()]!;
        }
        return ruta;
      }

      // Actualiza las distancias y nodos previos para los nodos vecinos
      for (const arista of nodoActual.getArista()) {
        const nodoVecino = arista.getNodo();
        const distanciaDesdeOrigen = distancias[nodoActual.getId()] + arista.getPeso();
        if (distanciaDesdeOrigen < distancias[nodoVecino.getId()]) {
          distancias[nodoVecino.getId()] = distanciaDesdeOrigen;
          previos[nodoVecino.getId()] = nodoActual;
        }
      }
    }

    // Si no se pudo encontrar una ruta, devuelve un arreglo vacío
    return [];
  }

  async calcularCosto(ruta: Nodo[]): Promise<number> {
    const tarifaPorKilometro = 1000; // Supongamos una tarifa de 1.5 dólares por kilómetro

    // Calcular la distancia total de la ruta
    let distanciaTotal = 0;
    for (let i = 0; i < ruta.length - 1; i++) {
      const nodoActual = ruta[i];
      const nodoSiguiente = ruta[i + 1];

      // Encontrar la arista entre los nodos
      const arista = nodoActual.getArista().find(a => a.getNodo() === nodoSiguiente);

      if (arista) {
        distanciaTotal += arista.getPeso();
      }
    }

    // Calcular el costo en función de la distancia y la tarifa por kilómetro
    const costo = distanciaTotal * tarifaPorKilometro;
    return costo;
  }

  async calcularDistanciaTotal(ruta: Nodo[]): Promise<number> {
    // Inicializar la distancia total en 0
    let distanciaTotal = 0;

    // Recorrer la ruta y sumar las distancias de las aristas
    for (let i = 0; i < ruta.length - 1; i++) {
      const nodoActual = ruta[i];
      const nodoSiguiente = ruta[i + 1];

      // Encontrar la arista entre los nodos
      const arista = nodoActual.getArista().find(a => a.getNodo() === nodoSiguiente);

      if (arista) {
        distanciaTotal += arista.getPeso();
      }
    }

    return distanciaTotal;
  }

  // // Función para obtener el camino más corto entre el origen y el destino del modelo viaje
  // async obtenerRutaMasCorta(origen: string, destino: string): Promise<string[]> {
  //   // Convertir origen y destino a números
  //   const origenNumero = Number(origen);
  //   const destinoNumero = Number(destino);

  //   // Obtener el viaje desde el modelo de viaje
  //   let viaje = await this.viajeRepository.findOne({where: {puntoOrigenId: origenNumero, puntoDestinoId: destinoNumero}});

  //   if (!viaje) {
  //     // crear un nuevo viaje en la base de datos con los valores proporcionados y luego continuar con la lógica de rutas
  //     const nuevoViaje = new Viaje({
  //       puntoOrigenId: origenNumero,
  //       puntoDestinoId: destinoNumero,
  //       estado: 'pendiente',
  //     });

  //     const nuevoViajeGuardado = await this.viajeRepository.create(nuevoViaje);
  //     //continuar con la logica de rutas utilizando el nuevo viaje
  //     viaje = nuevoViajeGuardado;
  //   }

  //   // Obtener el grafo dirigido previamente creado
  //   const grafo = await this.crearGrafoViajes(); // Reutiliza la función anterior

  //   // Lógica para encontrar la ruta más corta
  //   const visitados: {[key: string]: boolean} = {};
  //   const distancia: {[key: string]: number} = {};
  //   const ruta: {[key: string]: string} = {};

  //   for (const nodo of grafo.nodes()) {
  //     distancia[nodo] = Number.MAX_SAFE_INTEGER;
  //   }

  //   distancia[origen] = 0;

  //   for (let i = 0; i < grafo.nodeCount(); i++) {
  //     const nodoActual = await this.encontrarNodoNoVisitadoConMenorDistancia(grafo, visitados, distancia);
  //     visitados[nodoActual] = true;

  //     const vecinos = await grafo.successors(nodoActual); // Espera a que se resuelva la Promesa

  //     if (!Array.isArray(vecinos)) {
  //       throw new Error('Los vecinos no son una matriz de cadenas.');
  //     }

  //     for (const vecino of vecinos) {
  //       const peso = grafo.edge(nodoActual, vecino);
  //       const distanciaAcumulada = distancia[nodoActual] + peso;
  //       if (distanciaAcumulada < distancia[vecino]) {
  //         distancia[vecino] = distanciaAcumulada;
  //         ruta[vecino] = nodoActual;
  //       }
  //     }
  //   }

  //   const rutaMasCorta = await this.reconstruirRuta(origen, destino, ruta);
  //   const kmRecorrido = distancia[destino];
  //   const costo = kmRecorrido * 1000;

  //   // Actualizar el atributo kmRecorrido del modelo de viaje
  //   viaje.kmRecorrido = kmRecorrido;
  //   viaje.costo = costo;

  //   //Crear un nuevo estado de viaje para representar el cambio de estado:
  //   const nuevoEstado: EstadoViaje = new EstadoViaje({
  //     estado: 'en curso',
  //     comentario: `Viaje en curso`,
  //     fecha: new Date().toISOString(),
  //     viajeId: viaje.id,
  //   });

  //   //Guardar el nuevo estado de viaje en la base de datos
  //   await this.estadoViajeRepository.create(nuevoEstado);

  //   console.log(`Ruta más favorable de ${origen} a ${destino}: ${rutaMasCorta.join(' -> ')}`);

  //   return rutaMasCorta;
  // }


  // async encontrarNodoNoVisitadoConMenorDistancia(grafo: any, visitados: any, distancia: any): Promise<string> {
  //   let minDistancia = Number.MAX_SAFE_INTEGER;
  //   let nodoConMinDistancia: string | null = null;

  //   for (const nodo of grafo.nodes()) {
  //     if (!visitados[nodo] && distancia[nodo] < minDistancia) {
  //       minDistancia = distancia[nodo];
  //       nodoConMinDistancia = nodo;
  //     }
  //   }

  //   if (nodoConMinDistancia) {
  //     return nodoConMinDistancia;
  //   } else {
  //     throw new Error('No se encontró una ruta desde el origen al destino');
  //   }
  // }

  // async reconstruirRuta(origen: string, destino: string, ruta: any): Promise<string[]> {
  //   const rutaMasCorta: string[] = [];
  //   let nodoActual = destino;

  //   while (nodoActual !== origen) {
  //     rutaMasCorta.unshift(nodoActual);
  //     nodoActual = ruta[nodoActual];
  //   }

  //   rutaMasCorta.unshift(origen);
  //   return rutaMasCorta;
  // }

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
