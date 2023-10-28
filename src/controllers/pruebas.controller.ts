import {service} from '@loopback/core';
import {
  get,
  getModelSchemaRef,
  response
} from '@loopback/rest';
import {Grafo} from '../grafo/grafo';
import {SolicitudViajeService} from '../services';

export class pruebasController {
  constructor(
    @service(SolicitudViajeService)
    private solicitudViajeSevice: SolicitudViajeService
  ) { }



  @get('/build-graph')
  @response(200, {
    description: 'Build the graph based on db records',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Grafo),
        },
      },
    },
  })
  async grafo(

  ): Promise<Grafo> {
    let grafo = await this.solicitudViajeSevice.crearGrafo();
    this.solicitudViajeSevice.printGraph(grafo);
    return grafo;
  }

  @get('/get-shortest-path')
  @response(200, {
    description: 'Get shortest path between two nodes',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Grafo),
        },
      },
    },
  })
  //Función para mostrar la función del servicio de costoRutaMasCorta
  async rutaMasCorta(
  ): Promise<number> {
    let grafo = await this.solicitudViajeSevice.crearGrafo();
    const costo = await this.solicitudViajeSevice.costoRutaMasCorta('15', '17');
    return costo;
  }

}
