import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {EstadoConductor, EstadoConductorRelations, Conductor} from '../models';
import {ConductorRepository} from './conductor.repository';

export class EstadoConductorRepository extends DefaultCrudRepository<
  EstadoConductor,
  typeof EstadoConductor.prototype.id,
  EstadoConductorRelations
> {

  public readonly conductor: BelongsToAccessor<Conductor, typeof EstadoConductor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>,
  ) {
    super(EstadoConductor, dataSource);
    this.conductor = this.createBelongsToAccessorFor('conductor', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductor', this.conductor.inclusionResolver);
  }
}
