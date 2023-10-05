import {injectable} from '@loopback/core';

@injectable()
export class ParadaService {
  constructor() {}

  // Lista de paradas establecidas con sus distancias entre paradas
  static paradas = [
    { id: 1, nombre: 'Parada A', distanciaKm: 5 },
    { id: 2, nombre: 'Parada B', distanciaKm: 8 },
    { id: 3, nombre: 'Parada C', distanciaKm: 10 },
    // Otras paradas
  ];

  static obtenerParadaPorId(paradaId: number) {
    return this.paradas.find(parada => parada.id === paradaId);
  }

  static obtenerDistanciasEntreParadas(origenId: number, destinoId: number) {
    const origenIndex = this.paradas.findIndex(parada => parada.id === origenId);
    const destinoIndex = this.paradas.findIndex(parada => parada.id === destinoId);

    if (origenIndex !== -1 && destinoIndex !== -1) {
      return this.paradas.slice(origenIndex, destinoIndex + 1);
    }

    return null;
  }

  static calcularDistanciaTotal(distanciasEntreParadas: any[] | null) {
    if (distanciasEntreParadas) {
      return distanciasEntreParadas.reduce((total, parada) => total + parada.distanciaKm, 0);
    }
    return null;
  }
}
