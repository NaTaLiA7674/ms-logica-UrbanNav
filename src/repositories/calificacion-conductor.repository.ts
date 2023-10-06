import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {CalificacionConductor, CalificacionConductorRelations, Viaje, Cliente, Conductor} from '../models';
import {ViajeRepository} from './viaje.repository';
import {ClienteRepository} from './cliente.repository';
import {ConductorRepository} from './conductor.repository';

export class CalificacionConductorRepository extends DefaultCrudRepository<
  CalificacionConductor,
  typeof CalificacionConductor.prototype.id,
  CalificacionConductorRelations
> {

  public readonly viaje: BelongsToAccessor<Viaje, typeof CalificacionConductor.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof CalificacionConductor.prototype.id>;

  public readonly conductor: BelongsToAccessor<Conductor, typeof CalificacionConductor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>,
  ) {
    super(CalificacionConductor, dataSource);
    this.conductor = this.createBelongsToAccessorFor('conductor', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductor', this.conductor.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.viaje = this.createBelongsToAccessorFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
  }
}
