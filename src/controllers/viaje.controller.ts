import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {EstadoViaje, Viaje} from '../models';
import {ClienteRepository, ConductorRepository, DistanciasRepository, EstadoViajeRepository, ParadaRepository, ViajeRepository} from '../repositories';
import {SolicitudViajeService} from '../services';

export class ViajeController {
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
    @service(SolicitudViajeService)
    public solicitudViajeService: SolicitudViajeService,
  ) { }


  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuSolicitudViajeId, ConfiguracionSeguridad.guardarAccion],
  })
  @post('/viaje')
  @response(200, {
    description: 'Viaje model instance',
    content: {'application/json': {schema: getModelSchemaRef(Viaje)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Viaje, {
            title: 'NewViaje',
            exclude: ['id'],
          }),
        },
      },
    })
    viaje: Omit<Viaje, 'id'>,
  ): Promise<Viaje> {
    const solicitudViajeService = new SolicitudViajeService(
      this.viajeRepository,
      this.conductorRepository,
      this.estadoViajeRepository,
      this.paradaRepository,
      this.distanciasRepository,
      this.clienteRepository,
    );

    try {
      const puntoOrigen = viaje.puntoOrigenId.toString();
      const puntoDestino = viaje.puntoDestinoId.toString();

      if (!puntoOrigen || !puntoDestino) {
        throw new HttpErrors.BadRequest('Puntos de origen o destino no encontrados');
      }

      // Utiliza la función para obtener la ruta más corta y los valores de costo y kmRecorrido
      const grafo = await solicitudViajeService.crearGrafo(); // Crear el grafo
      const rutaMasCorta = await solicitudViajeService.costoRutaMasCorta(puntoOrigen, puntoDestino);

      // if (rutaMasCorta === "El origen o el destino no existen en el grafo") {
      //   throw new HttpErrors.BadRequest('No se pudo encontrar una ruta válida');
      // }

      // // Calcula el costo y la distancia total basados en la ruta más corta
      // const costo = parseFloat(rutaMasCorta.split(' ')[6]);
      // const kmRecorrido = await solicitudViajeService.calcularDistanciaTotal(rutaMasCorta);

      // Crear una nueva solicitud de viaje con los valores proporcionados
      const nuevoViaje: Viaje = new Viaje({
        // costo: costo,
        // kmRecorrido: kmRecorrido,
        clienteId: viaje.clienteId,
        calificacionConductorId: viaje.calificacionConductorId,
        calificacionClienteId: viaje.calificacionClienteId,
        facturaId: viaje.facturaId,
        conductorId: viaje.conductorId,
        puntoOrigenId: viaje.puntoOrigenId,
        puntoDestinoId: viaje.puntoDestinoId,
        paradaId: viaje.paradaId,
        botonPanicoId: viaje.botonPanicoId,
      });

      // Guarda el nuevo viaje en la base de datos
      const nuevaSolicitudViaje = await this.viajeRepository.create(nuevoViaje);

      // // Asignar un conductor al viaje
      // await solicitudViajeService.asignarConductor(nuevaSolicitudViaje.id!);

      return nuevaSolicitudViaje;
    } catch (error) {
      console.error('Error en función create:', error);
      // Maneja cualquier error que pueda ocurrir al crear la solicitud de viaje o asignar un conductor
      throw new HttpErrors.BadRequest('No se pudo crear la solicitud de viaje: ' + error.message);
    }
  }


  @get('/viaje/count')
  @response(200, {
    description: 'Viaje model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Viaje) where?: Where<Viaje>,
  ): Promise<Count> {
    return this.viajeRepository.count(where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuSolicitudViajeId, ConfiguracionSeguridad.listarAccion],
  })
  @get('/viaje')
  @response(200, {
    description: 'Array of Viaje model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Viaje, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Viaje) filter?: Filter<Viaje>,
  ): Promise<Viaje[]> {
    return this.viajeRepository.find(filter);
  }

  @patch('/viaje')
  @response(200, {
    description: 'Viaje PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Viaje, {partial: true}),
        },
      },
    })
    viaje: Viaje,
    @param.where(Viaje) where?: Where<Viaje>,
  ): Promise<Count> {
    return this.viajeRepository.updateAll(viaje, where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuSolicitudViajeId, ConfiguracionSeguridad.descargarAccion],
  })
  @get('/viaje/{id}')
  @response(200, {
    description: 'Viaje model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Viaje, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Viaje, {exclude: 'where'}) filter?: FilterExcludingWhere<Viaje>
  ): Promise<Viaje> {
    return this.viajeRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuSolicitudViajeId, ConfiguracionSeguridad.editarAccion],
  })
  @patch('/viaje/{id}')
  @response(204, {
    description: 'Viaje PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Viaje, {
            partial: true, // Permite actualizaciones parciales
            exclude: ['id'],
          }),
        },
      },
    })
    viaje: Omit<Viaje, 'id'>,
  ): Promise<void> {
    try {
      const solicitudViajeService = new SolicitudViajeService(
        this.viajeRepository,
        this.conductorRepository,
        this.estadoViajeRepository,
        this.paradaRepository,
        this.distanciasRepository,
        this.clienteRepository,
      );

      const puntoOrigen = viaje.puntoOrigenId.toString();
      const puntoDestino = viaje.puntoDestinoId.toString();

      if (!puntoOrigen || !puntoDestino) {
        throw new HttpErrors.BadRequest('Puntos de origen o destino no encontrados');
      }

      // Utiliza la función para obtener la ruta más corta y los valores de costo y kmRecorrido
      const grafo = await solicitudViajeService.crearGrafo(); // Crear el grafo
      const rutaMasCorta = await solicitudViajeService.costoRutaMasCorta(puntoOrigen, puntoDestino);

      // // Calcula el costo y la distancia total basados en la ruta más corta
      // const costo = parseFloat(rutaMasCorta.split(' ')[6]);
      // const kmRecorrido = await solicitudViajeService.calcularDistanciaTotal(rutaMasCorta);

      // Actualiza los valores proporcionados en el viaje existente
      const existingViaje = await this.viajeRepository.findById(id);
      if (!existingViaje) {
        throw new HttpErrors.BadRequest('No se encontró el viaje con el ID especificado.');
      }

      for (const key of Object.keys(viaje)) {
        if (key in existingViaje) {
          (existingViaje as any)[key] = (viaje as any)[key];
        }
      }

      // // Actualiza el costo y la distancia en el viaje existente
      // existingViaje.costo = costo;
      // existingViaje.kmRecorrido = kmRecorrido;

      // Guarda los cambios en el viaje existente
      await this.viajeRepository.update(existingViaje);

      // // Asigna un conductor al viaje después de actualizarlo
      // await solicitudViajeService.asignarConductor(existingViaje.id!);

      return;
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir al actualizar la solicitud de viaje o asignar un conductor
      throw new HttpErrors.BadRequest('No se pudo actualizar la solicitud de viaje: ' + error.message);
    }
  }



  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuCancelarViajeId, ConfiguracionSeguridad.guardarAccion],
  })
  @patch('/viaje/{id}/cancelar')
  @response(204, {
    description: 'Viaje cancelado con éxito',
  })
  async cancelarViaje(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {type: 'object', properties: {motivo: {type: 'string'}}},
        },
      },
    })
    motivo: {motivo: string},
  ): Promise<void> {
    const solicitudViajeService = new SolicitudViajeService(
      this.viajeRepository,
      this.conductorRepository,
      this.estadoViajeRepository,
      this.paradaRepository,
      this.distanciasRepository,
      this.clienteRepository,
    );

    try {
      const viaje = await this.viajeRepository.findById(id);

      if (!viaje) {
        throw new HttpErrors.NotFound('No se encontró el viaje con el ID proporcionado');
      }

      // Verifica si existe un registro en el modelo EstadoViaje que indique que el viaje ha sido cancelado
      const estadoCancelacion = await this.estadoViajeRepository.findOne({
        where: {
          viajeId: viaje.id,
          estado: 'cancelado',
        },
      });

      if (estadoCancelacion) {
        throw new HttpErrors.BadRequest('El viaje ya ha sido cancelado');
      }

      //Crear un nuevo estado de viaje para representar el cambio de estado:
      const nuevoEstado: EstadoViaje = new EstadoViaje({
        estado: 'cancelado',
        comentario: `El viaje ha sido cancelado`,
        fecha: new Date().toISOString(),
        viajeId: viaje.id,
      });

      // Guarda el nuevo estado de viaje en la base de datos
      await this.estadoViajeRepository.create(nuevoEstado);

      // Actualiza el estado de cancelación del viaje
      viaje.estado = 'cancelado';

      // Actualiza el viaje en la base de datos
      await this.viajeRepository.update(viaje);

      return;
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir al cancelar el viaje
      throw new HttpErrors.BadRequest('No se pudo cancelar el viaje: ' + error.message);
    }
  }

  @put('/viaje/{id}')
  @response(204, {
    description: 'Viaje PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() viaje: Viaje,
  ): Promise<void> {
    await this.viajeRepository.replaceById(id, viaje);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuSolicitudViajeId, ConfiguracionSeguridad.eliminarAccion],
  })
  @del('/viaje/{id}')
  @response(204, {
    description: 'Viaje DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.viajeRepository.deleteById(id);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuHistorialViajesId, ConfiguracionSeguridad.listarAccion],
  })
  @get('/viajes-cliente/{clienteId}')
  @response(200, {
    description: 'Viaje model instances for a specific cliente',
    content: {
      'application/json': {
        schema: {type: 'array', items: getModelSchemaRef(Viaje, {includeRelations: true})},
      },
    },
  })
  async findViajesPorCliente(
    @param.path.number('clienteId') clienteId: number,
    @param.filter(Viaje, {exclude: 'where'}) filter?: FilterExcludingWhere<Viaje>,
  ): Promise<Viaje[]> {
    // Obtener los viajes realizados por el cliente específico
    const viajes = await this.viajeRepository.find({
      where: {clienteId: clienteId}, // Asumiendo que tienes una propiedad "clienteId" en el modelo Viaje que vincula al cliente
    }, filter);

    return viajes;
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuHistorialViajesId, ConfiguracionSeguridad.eliminarAccion],
  })
  @del('/viajes-cliente/{clienteId}')
  @response(204, {
    description: 'Viaje DELETE success',
  })
  async deleteViajesPorCliente(@param.path.number('clienteId') clienteId: number): Promise<void> {
    await this.viajeRepository.deleteAll({clienteId: clienteId});
  }

}
