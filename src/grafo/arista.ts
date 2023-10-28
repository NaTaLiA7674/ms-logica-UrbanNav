import {Nodo} from './nodo';

export class Arista {
  nodo: Nodo;
  peso: number;

  constructor(nodo: Nodo, peso: number) {
    this.nodo = nodo;
    this.peso = peso;
  }

  // Obtener el nodo de la arista (anteriormente 'getDestino')
  getNodo(): Nodo {
    return this.nodo;
  }

  // Obtener el peso de la arista (anteriormente 'getPeso')
  getPeso(): number {
    return this.peso;
  }

  // Establecer el nodo de la arista
  setNodo(nodo: Nodo) {
    this.nodo = nodo;
  }

  // Establecer el peso de la arista
  setPeso(peso: number) {
    this.peso = peso;
  }

  // Nuevo método para obtener el costo de la arista
  getCosto(): number {
    return this.peso;
  }
}
