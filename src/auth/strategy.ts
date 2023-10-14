import {AuthenticationBindings, AuthenticationMetadata, AuthenticationStrategy} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';

export class AuthStrategy implements AuthenticationStrategy {
  name: string = 'auth';

  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata[],
  ) { }

  /**
   * Autenticación de un usuario frente a una acción en la BBDD
   * @param request la solicitud con el token
   * @returns el perfil de usuario undefined cuando no tiene permiso o httpError
   */
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let idMenu: string = this.metadata[0].options![0];
      let accion: string = this.metadata[0].options![1];
      console.log(this.metadata);
      //Conectar con el ms-seguridad
      console.log("Conectando con el ms-seguridad")

      let continuar: boolean = false;
      if (continuar) {
        let perfil: UserProfile = Object.assign({
          permitido: "OK"
        });
        return perfil;
      } else {
        return undefined;
      }
    }
    throw new HttpErrors[401]("No es posible ejecutar la acción por falta de un token")
  }
}
