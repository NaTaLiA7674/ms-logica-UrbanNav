import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {CalificacionCliente, CalificacionClienteRelations, Viaje, Cliente, Conductor} from '../models';
import {ViajeRepository} from './viaje.repository';
import {ClienteRepository} from './cliente.repository';
import {ConductorRepository} from './conductor.repository';

export class CalificacionClienteRepository extends DefaultCrudRepository<
  CalificacionCliente,
  typeof CalificacionCliente.prototype.id,
  CalificacionClienteRelations
> {

  public readonly viaje: BelongsToAccessor<Viaje, typeof CalificacionCliente.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof CalificacionCliente.prototype.id>;

  public readonly conductor: BelongsToAccessor<Conductor, typeof CalificacionCliente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>,
  ) {
    super(CalificacionCliente, dataSource);
    this.conductor = this.createBelongsToAccessorFor('conductor', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductor', this.conductor.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.viaje = this.createBelongsToAccessorFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
  }
}
