import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Arista} from '../grafo/arista';
import {Grafo} from '../grafo/grafo';
import {Nodo} from '../grafo/nodo';
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

  //Función para encontrar el camino mas corto entre origen y destino ingresados, y que devuelva el costo del viaje segun el grafo creado
  async costoRutaMasCorta(origen: string, destino: string): Promise<number> {
    const grafo = await this.crearGrafo();
    const costoPorKilometro = 1000;
    let costoTotal = 0;

    if (!grafo.getNodoById(origen) || !grafo.getNodoById(destino)) {
      throw new Error('Nodo de origen o destino no encontrado en el grafo.');
    }

    const distancias: {[key: string]: number} = {};
    const nodoAnterior: {[key: string]: string} = {};
    const visitados: {[key: string]: boolean} = {};

    const cola: string[] = [origen];
    distancias[origen] = 0;

    while (cola.length > 0) {
      const nodoActualId = cola.shift() as string;
      const nodoActual = grafo.getNodoById(nodoActualId);

      if (!nodoActual) {
        throw new Error('Nodo actual no encontrado en el grafo.');
      }

      visitados[nodoActualId] = true;

      for (const arista of nodoActual.aristas) {
        const nodoVecino = grafo.getNodoById(arista.nodo.id);
        if (!nodoVecino) {
          throw new Error('Nodo vecino no encontrado en el grafo.');
        }

        const distanciaHastaVecino = distancias[nodoActualId] + arista.peso;

        if (distanciaHastaVecino < (distancias[nodoVecino.id] || Infinity)) {
          distancias[nodoVecino.id] = distanciaHastaVecino;
          nodoAnterior[nodoVecino.id] = nodoActualId;
        }

        if (!visitados[nodoVecino.id] && !cola.includes(nodoVecino.id)) {
          cola.push(nodoVecino.id);
        }
      }
    }

    if (!distancias[destino]) {
      throw new Error('No se encontró una ruta entre el origen y el destino.');
    }

    // Reconstruir la ruta
    const ruta: string[] = [];
    let nodoActual = destino;
    while (nodoActual !== origen) {
      ruta.unshift(nodoActual);
      nodoActual = nodoAnterior[nodoActual];
    }
    ruta.unshift(origen);

    // Calcular el costo total de la ruta
    for (let i = 0; i < ruta.length - 1; i++) {
      const nodoOrigen = grafo.getNodoById(ruta[i]);
      const nodoDestino = grafo.getNodoById(ruta[i + 1]);

      if (!nodoOrigen || !nodoDestino) {
        throw new Error('Nodo de origen o destino no encontrado en el grafo.');
      }

      const arista = nodoOrigen.getAristaByDestino(nodoDestino.id);

      if (!arista) {
        throw new Error(`Arista no encontrada entre los nodos ${nodoOrigen.id} y ${nodoDestino.id}`);
      }

      costoTotal += arista.peso;
    }

    costoTotal *= costoPorKilometro;

    //Imprimir en consola la ruta
    console.log('Ruta: ', ruta);
    console.log('Costo total: ', costoTotal);

    return costoTotal;
  }

  //Método para buscar los conductores cercanos a un origen teniendo en cuenta que los conductores al iniciar sesión ingresan los puntos de parada cercanos
  async buscarConductoresCercanos(origen: string): Promise<any[]> {
    const conductores = await this.conductorRepository.find();
    const conductoresCercanos: any[] = [];

    for await (const conductor of conductores) {
      const paradasCercanas = conductor.paradaCercana; // Esto es una colección de paradas
      if (paradasCercanas.some(parada => parada.nombreParada === origen)) {
        conductoresCercanos.push(conductor);
      }
    }

    return conductoresCercanos;
  }

  // print the graph node by node with edges in console
  printGraph(grafo: Grafo) {
    const nodos = grafo.getNodos();
    for (const nodo of nodos) {
      console.log(nodo);
    }
  }

  GetShortestRoute(grafo: Grafo, origenId: string, destinoId: string) {
  }

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
