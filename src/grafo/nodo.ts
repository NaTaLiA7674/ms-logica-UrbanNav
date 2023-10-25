import {Arista} from './arista';


// class for Node of a graph with id, label, address, and edges
export class Nodo {
  id: string;
  label: string;
  nombre: string;
  aristas: Arista[];

  constructor(id: string, nombre: string, label: string, aristas: Arista[] = []) {
    this.id = id;
    this.nombre = nombre;
    this.label = label;
    this.aristas = aristas;
  }

  // add edge to node
  addArista(arista: Arista) {
    this.aristas.push(arista);
  }

  // add setter for edges
  setAristas(aristas: Arista[]) {
    this.aristas = aristas;
  }

  // get edges of node
  getArista() {
    return this.aristas;
  }

  // get id of node
  getId() {
    return this.id;
  }

  // get label of node
  getLabel() {
    return this.label;
  }


  // set id of node
  setId(id: string) {
    this.id = id;
  }

  // set label of node
  setLabel(label: string) {
    this.label = label;
  }

  // get name of node
  getNombre() {
    return this.nombre;
  }

  // set name of node
  setNombre(nombre: string) {
    this.nombre = nombre;
  }

}
