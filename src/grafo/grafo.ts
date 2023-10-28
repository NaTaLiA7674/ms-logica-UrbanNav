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

  /// Método para calcular la mejor ruta utilizando el algoritmo Dijkstra
  calcularMejorRuta(origen: string, destino: string) {
    // Estructuras para mantener un seguimiento de los nodos visitados y sus distancias
    const visitados: {[key: string]: boolean} = {};
    const distancias: {[key: string]: number} = {};
    const nodoAnterior: {[key: string]: string} = {};

    // Inicializar todas las distancias a infinito, excepto el origen que se establece en 0
    this.nodos.forEach((nodo) => {
      const nodoId = nodo.getId();
      distancias[nodoId] = nodoId === origen ? 0 : Infinity;
      nodoAnterior[nodoId] = '';
    });

    // Bucle principal para encontrar la mejor ruta
    while (true) {
      let nodoActual: string | null = null;
      let distanciaMinima = Infinity;

      // Encontrar el nodo no visitado con la distancia mínima
      this.nodos.forEach((nodo) => {
        const nodoId = nodo.getId();
        if (!visitados[nodoId] && distancias[nodoId] < distanciaMinima) {
          nodoActual = nodoId;
          distanciaMinima = distancias[nodoId];
        }
      });

      // Si no se encontró ningún nodo no visitado con distancia mínima, hemos terminado
      if (nodoActual === null) {
        break;
      }

      // Marcar el nodo actual como visitado
      visitados[nodoActual] = true;

      // Actualizar las distancias a los nodos vecinos no visitados
      this.nodos.forEach((nodo) => {
        const nodoId = nodo.getId();
        if (!visitados[nodoId]) {
          const arista = nodo.getAristaByDestino(nodoActual!);
          if (arista && distancias[nodoId] !== undefined && distancias[nodoActual!] !== undefined) {
            const distanciaNueva = distancias[nodoActual!] + arista.getCosto();
            if (distanciaNueva < distancias[nodoId]) {
              distancias[nodoId] = distanciaNueva;
              nodoAnterior[nodoId] = nodoActual!;
            }
          }
        }
      });
    }

    // Recuperar la ruta y el costo
    const ruta: string[] = [];
    let nodoActual = destino;

    while (nodoActual !== origen) {
      ruta.unshift(nodoActual);
      nodoActual = nodoAnterior[nodoActual];
    }

    ruta.unshift(origen);

    const costo = distancias[destino];

    return {ruta, costo};
  }

}
