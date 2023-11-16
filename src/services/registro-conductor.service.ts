import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import fetch from 'node-fetch';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {Conductor} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class RegistroConductorService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  //Función para registrar un nuevo conductor en el microservicio de seguridad llamando al fetch
  async registrarConductor(
    conductor: Conductor
  ): Promise<any> {
    const datos = {
      primerNombre: conductor.primerNombre,
      segundoNombre: conductor.segundoNombre,
      primerApellido: conductor.primerApellido,
      segundoApellido: conductor.segundoApellido,
      correo: conductor.correo,
      celular: conductor.celular,
      rolId: ConfiguracionSeguridad.IdRolConductor
    };
    const urlRegistrarConductor = `${ConfiguracionSeguridad.enlaceMicroservicioSeguridad}/usuario-publico`;

    // Agrega registros detallados en diferentes puntos del flujo de ejecución
    console.log('URL de solicitud al microservicio de seguridad:', urlRegistrarConductor);
    console.log('Datos enviados al microservicio:', datos);
    let res = undefined;
    try {
      await fetch(urlRegistrarConductor, {
        method: 'post',
        body: JSON.stringify(datos),
        headers: {'Content-Type': 'application/json'},
      })
        .then((res: any) => res.json())
        .then((json: any) => {
          res = json;
        });
      console.log('Respuesta del microservicio de seguridad:', res);
      if (res) {
        return res;
      } else {
        return undefined;
      }
    } catch (e) {
      throw new Error('No se pudo registrar el conductor');
    }
  }
}
