import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  getModelSchemaRef,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {SolicitudViajeService} from '../services/solicitud-viaje.service';

export class SolicitudViajeController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject('services.SolicitudViajeService')
    private solicitudViajeService: SolicitudViajeService,
  ) {}

  @post('/solicitudes-viaje')
  @response(200, {
    description: 'Solicitud de viaje',
    content: {'application/json': {schema: getModelSchemaRef(Object)}},
  })
  async crearSolicitudViaje(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudViajeService, {
            title: 'NuevaSolicitudViaje',
          }),
        },
      },
    })
    solicitud: SolicitudViajeService,
  ): Promise<any> {
    const origenId = solicitud.origenId;
    const destinoId = solicitud.destinoId;
    const clienteId = solicitud.clienteId;
    const informacionAdicional = solicitud.informacionAdicional;

    const nuevaSolicitud = await this.solicitudViajeService.crearSolicitudViaje(
      origenId,
      destinoId,
      clienteId,
      informacionAdicional,
    );

    // Lógica para guardar la solicitud en la base de datos si es necesario
    // Puedes utilizar this.solicitudViajeService para interactuar con la lógica de negocio

    return nuevaSolicitud;
  }
}

