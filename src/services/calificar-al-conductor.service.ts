// calificar-al-conductor.service.ts
import {injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CalificacionCliente, Cliente, Conductor} from '../models';
import {CalificacionClienteRepository} from '../repositories';

@injectable()
export class CalificarAlConductorService {
  constructor(
    // Inyecta el repositorio en el constructor
    @repository(CalificacionClienteRepository)
    private calificacionClienteRepository: CalificacionClienteRepository,
  ) { }

  async crearCalificacionAlConductor(calificacion: CalificacionCliente, cliente: Cliente, conductor: Conductor): Promise<CalificacionCliente> {
    try {
      // Verifica si la calificación es válida
      if (!cliente || !conductor || calificacion.puntuacion < 1 || calificacion.puntuacion > 5) {
        throw new Error('Los datos de calificación no son válidos');
      }

      // Agrega la fecha actual (puedes usar una biblioteca de manejo de fechas como moment.js o Date.now() según tu preferencia)
      calificacion.fecha = new Date();

      // Aquí puedes agregar lógica para guardar la calificación en tu base de datos
      // Por ejemplo, utilizando un repositorio o una consulta SQL, dependiendo de tu modelo de datos

      // Supongamos que tienes un repositorio para CalificacionCliente
      const calificacionGuardada = await this.calificacionClienteRepository.create(calificacion);

      return calificacionGuardada;
    } catch (error) {
      throw new Error('No se pudo crear la calificación');
    }
  }
}

