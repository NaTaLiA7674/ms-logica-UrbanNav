import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import * as dijkstrajs from 'dijkstrajs';
import * as graphlib from 'graphlib';
import {Conductor, EstadoViaje, Viaje} from '../models';
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


//Función para crear una solicitud de viaje usando todos las funciones creadas en el servicio de solicitud de viaje, teniendo en cuenta la conexion a la base de datos mysql
  async crearSolicitudViaje(viaje: Viaje): Promise<Viaje> {
    // Crear una nueva solicitud de viaje en la base de datos
    const nuevaSolicitud = await this.viajeRepository.create(viaje);

    // Crear un nuevo estado de viaje para representar la creación de la solicitud
    const estadoCreado: EstadoViaje = new EstadoViaje({
      estado: 'creada',
      comentario: 'Solicitud de viaje creada',
      fecha: new Date().toISOString(),
      viajeId: nuevaSolicitud.id,
    });

    // Crear el estado de viaje en la base de datos
    await this.estadoViajeRepository.create(estadoCreado);

    return nuevaSolicitud;
  }


  //Función para asignar un conductor a una solicitud de viaje
  async asignarConductor(solicitudId: number, conductorId: number): Promise<void> {
    // Verificar si la solicitud de viaje y el conductor existen
    const solicitud: Viaje = await this.viajeRepository.findById(solicitudId);
    const conductor: Conductor = await this.conductorRepository.findById(conductorId);

    if (!solicitud || !conductor) {
      throw new Error('Solicitud de viaje o conductor no encontrados');
    }

    // Verificar si la solicitud está pendiente y el conductor no está asignado a otra solicitud
    if (solicitud.estado !== 'pendiente' || solicitud.conductorId) {
      throw new Error('La solicitud ya ha sido asignada o no esta pendiente');
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


  //Función para obtener el camino más corto entre el origen y el destino del modelo viaje usando dijkstra
  async obtenerRutaMasCorta(origen: string, destino: string): Promise<void> {
    //Convertir origen y destino a numeros
    const origenNumero = Number(origen);
    const destinoNumero = Number(destino);
    //Obtener el viaje desde el modelo de viaje
    const viaje = await this.viajeRepository.findOne({where: {puntoOrigenId: origenNumero, puntoDestinoId: destinoNumero}});

    if (!viaje) {
      throw new Error('Viaje no encontrado');
    }

    //Obtener el grafo dirigido previamente creado
    const grafo = await this.crearGrafoViajes(); //Reutiliza la función anterior

    //Obtener la ruta más corta desde el origen hasta el destino utilizando dijkstrajs
    const rutaMasCorta = dijkstrajs.find_path(grafo, origen, destino);

    if (!rutaMasCorta) {
      throw new Error('No se encontró una ruta desde el origen al destino');
    }

    //Calcular el kilometraje recorrido en la ruta más corta usando la variable kmRecorrido del modelo de viaje
    let kmRecorrido = 0;
    for (let i = 0; i < rutaMasCorta.length - 1; i++) {
      const origen = rutaMasCorta[i];
      const destino = rutaMasCorta[i + 1];
      const peso = grafo.edge(origen, destino);
      kmRecorrido += Number(peso);
    }

    //Actualizar el atributo kmRecorrido del modelo de viaje
    viaje.kmRecorrido = kmRecorrido;
    console.log(`Ruta más favorable de ${origen} a ${destino}: ${rutaMasCorta.join(' -> ')}`);
    console.log(`Kilometraje recorrido: ${kmRecorrido}`);
  }


//funcion para obtener el precio del viaje, se reutiliza la funcion anterior de obtener ruta mas corta, se reutiliza la funcion de calcular el kilometraje recorrido, valor por km = 1000
  async obtenerPrecio(origen: string, destino: string): Promise<void> {
    //Convertir origen y destino a numeros
    const origenNumero = Number(origen);
    const destinoNumero = Number(destino);
    //Obtener el viaje desde el modelo de viaje
    const viaje = await this.viajeRepository.findOne({where: {puntoOrigenId: origenNumero, puntoDestinoId: destinoNumero}});

    if (!viaje) {
      throw new Error('Viaje no encontrado');
    }

    //Obtener el grafo dirigido previamente creado
    const grafo = await this.crearGrafoViajes(); //Reutiliza la función anterior

    //Obtener la ruta más corta desde el origen hasta el destino utilizando dijkstrajs
    const rutaMasCorta = dijkstrajs.find_path(grafo, origen, destino);

    if (!rutaMasCorta) {
      throw new Error('No se encontró una ruta desde el origen al destino');
    }

    //Calcular el kilometraje recorrido en la ruta más corta usando la variable kmRecorrido del modelo de viaje
    let kmRecorrido = 0;
    for (let i = 0; i < rutaMasCorta.length - 1; i++) {
      const origen = rutaMasCorta[i];
      const destino = rutaMasCorta[i + 1];
      const peso = grafo.edge(origen, destino);
      kmRecorrido += Number(peso);
    }

    //Actualizar el atributo kmRecorrido del modelo de viaje
    viaje.kmRecorrido = kmRecorrido;

    console.log(`Ruta más favorable de ${origen} a ${destino}: ${rutaMasCorta.join(' -> ')}`);
    console.log(`Kilometraje recorrido: ${kmRecorrido}`);
    console.log(`Precio del viaje: ${kmRecorrido*1000}`);
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
