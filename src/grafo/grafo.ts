// class Graph with a Node List

import {Nodo} from './nodo';

export class Grafo {

  nodos: Nodo[];

  constructor(nodos: Nodo[]) {
    this.nodos = nodos;
  }

  // add node to graph
  addNodo(nodo: Nodo) {
    this.nodos.push(nodo);
  }

  // get node list of graph
  getNodos() {
    return this.nodos;
  }

  // set node list of graph
  setNodos(nodos: Nodo[]) {
    this.nodos = nodos;
  }

  // get node of graph by id
  getNodoById(id: string) {
    return this.nodos.find(nodo => nodo.getId() === id);
  }

  // get node of graph by label
  getNodoByLabel(label: string) {
    return this.nodos.find(nodo => nodo.getLabel() === label);
  }

  // show graph by console
  showGrafo() {
    console.log(this.nodos);
  }

  // show graph by console node by node with their edges
  showGrafoNodos() {
    this.nodos.forEach(nodo => {
      console.log(nodo);
    });
  }

}
