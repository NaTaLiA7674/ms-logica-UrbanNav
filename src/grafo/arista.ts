// class Edge for the graph with Node and Weight

import {Nodo} from './nodo';

export class Arista {
  nodo: Nodo;
  peso: number;

  constructor(nodo: Nodo, peso: number) {
    this.nodo = nodo;
    this.peso = peso;
  }

  // get node of edge
  getNodo() {
    return this.nodo;
  }

  // get weight of edge
  getPeso() {
    return this.peso;
  }

  // set node of edge
  setNodo(nodo: Nodo) {
    this.nodo = nodo;
  }

  // set weight of edge
  setPeso(peso: number) {
    this.peso = peso;
  }
}
