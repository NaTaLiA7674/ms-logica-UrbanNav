import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, Viaje, ViajeRelations, CalificacionConductor, CalificacionCliente, Factura, Conductor, EstadoViaje, Parada} from '../models';
import {ClienteRepository} from './cliente.repository';
import {CalificacionConductorRepository} from './calificacion-conductor.repository';
import {CalificacionClienteRepository} from './calificacion-cliente.repository';
import {FacturaRepository} from './factura.repository';
import {ConductorRepository} from './conductor.repository';
import {EstadoViajeRepository} from './estado-viaje.repository';
import {ParadaRepository} from './parada.repository';

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

  public readonly idPuntoDestino: HasManyRepositoryFactory<Parada, typeof Viaje.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('CalificacionConductorRepository') protected calificacionConductorRepositoryGetter: Getter<CalificacionConductorRepository>, @repository.getter('CalificacionClienteRepository') protected calificacionClienteRepositoryGetter: Getter<CalificacionClienteRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>, @repository.getter('EstadoViajeRepository') protected estadoViajeRepositoryGetter: Getter<EstadoViajeRepository>, @repository.getter('ParadaRepository') protected paradaRepositoryGetter: Getter<ParadaRepository>,
  ) {
    super(Viaje, dataSource);
    this.idPuntoDestino = this.createHasManyRepositoryFactoryFor('idPuntoDestino', paradaRepositoryGetter,);
    this.registerInclusionResolver('idPuntoDestino', this.idPuntoDestino.inclusionResolver);
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
