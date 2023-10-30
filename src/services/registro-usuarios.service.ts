import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import fetch from 'node-fetch';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {Cliente} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class RegistroUsuariosService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  //Función para registrar un nuevo usuario en el microservicio de seguridad llamando al fetch
  async registrarUsuario(
    cliente: Cliente
  ): Promise<any> {
    const datos = {
      primerNombre: cliente.primerNombre,
      segundoNombre: cliente.segundoNombre,
      primerApellido: cliente.primerApellido,
      segundoApellido: cliente.segundoApellido,
      correo: cliente.correo,
      celular: cliente.celular,
      rolId: ConfiguracionSeguridad.IdRolCliente
    };
    const urlRegistrarUsuario = `${ConfiguracionSeguridad.enlaceMicroservicioSeguridad}/usuario`;

    // Agrega registros detallados en diferentes puntos del flujo de ejecución
    console.log('URL de solicitud al microservicio de seguridad:', urlRegistrarUsuario);
    console.log('Datos enviados al microservicio:', datos);
    let res = undefined;
    try {
      await fetch(urlRegistrarUsuario, {
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
      throw new Error('No se pudo registrar el usuario');
    }
  }
}
