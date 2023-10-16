import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {CalificacionCliente, CalificacionConductor, Cliente, Conductor, EstadoViaje, Factura, Viaje, ViajeRelations, Parada, BotonPanico} from '../models';
import {CalificacionClienteRepository} from './calificacion-cliente.repository';
import {CalificacionConductorRepository} from './calificacion-conductor.repository';
import {ClienteRepository} from './cliente.repository';
import {ConductorRepository} from './conductor.repository';
import {EstadoViajeRepository} from './estado-viaje.repository';
import {FacturaRepository} from './factura.repository';
import {ParadaRepository} from './parada.repository';
import {BotonPanicoRepository} from './boton-panico.repository';

export class ViajeRepository extends DefaultCrudRepository<
  Viaje,
  typeof Viaje.prototype.id,
  ViajeRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Viaje.prototype.id>;

  public readonly calificacionConductor: BelongsToAccessor<CalificacionConductor, typeof Viaje.prototype.id>;

  public readonly calificacionCliente: BelongsToAccessor<CalificacionCliente, typeof Viaje.prototype.id>;

  public readonly factura: BelongsToAccessor<Factura, typeof Viaje.prototype.id>;

  public readonly conductor: BelongsToAccessor<Conductor, typeof Viaje.prototype.id>;

  public readonly estadoViaje: HasManyRepositoryFactory<EstadoViaje, typeof Viaje.prototype.id>;

  public readonly puntoOrigen: BelongsToAccessor<Parada, typeof Viaje.prototype.id>;

  public readonly puntoDestino: BelongsToAccessor<Parada, typeof Viaje.prototype.id>;

  public readonly botonPanico: BelongsToAccessor<BotonPanico, typeof Viaje.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('CalificacionConductorRepository') protected calificacionConductorRepositoryGetter: Getter<CalificacionConductorRepository>, @repository.getter('CalificacionClienteRepository') protected calificacionClienteRepositoryGetter: Getter<CalificacionClienteRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>, @repository.getter('EstadoViajeRepository') protected estadoViajeRepositoryGetter: Getter<EstadoViajeRepository>, @repository.getter('ParadaRepository') protected paradaRepositoryGetter: Getter<ParadaRepository>, @repository.getter('BotonPanicoRepository') protected botonPanicoRepositoryGetter: Getter<BotonPanicoRepository>,
  ) {
    super(Viaje, dataSource);
    this.botonPanico = this.createBelongsToAccessorFor('botonPanico', botonPanicoRepositoryGetter,);
    this.registerInclusionResolver('botonPanico', this.botonPanico.inclusionResolver);
    this.puntoDestino = this.createBelongsToAccessorFor('puntoDestino', paradaRepositoryGetter,);
    this.registerInclusionResolver('puntoDestino', this.puntoDestino.inclusionResolver);
    this.puntoOrigen = this.createBelongsToAccessorFor('puntoOrigen', paradaRepositoryGetter,);
    this.registerInclusionResolver('puntoOrigen', this.puntoOrigen.inclusionResolver);
    this.estadoViaje = this.createHasManyRepositoryFactoryFor('estadoViaje', estadoViajeRepositoryGetter,);
    this.registerInclusionResolver('estadoViaje', this.estadoViaje.inclusionResolver);
    this.conductor = this.createBelongsToAccessorFor('conductor', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductor', this.conductor.inclusionResolver);
    this.factura = this.createBelongsToAccessorFor('factura', facturaRepositoryGetter,);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
    this.calificacionCliente = this.createBelongsToAccessorFor('calificacionCliente', calificacionClienteRepositoryGetter,);
    this.registerInclusionResolver('calificacionCliente', this.calificacionCliente.inclusionResolver);
    this.calificacionConductor = this.createBelongsToAccessorFor('calificacionConductor', calificacionConductorRepositoryGetter,);
    this.registerInclusionResolver('calificacionConductor', this.calificacionConductor.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
