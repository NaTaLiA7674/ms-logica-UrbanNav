import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {BloqueoConductor, BloqueoConductorRelations, Conductor} from '../models';
import {ConductorRepository} from './conductor.repository';

export class BloqueoConductorRepository extends DefaultCrudRepository<
  BloqueoConductor,
  typeof BloqueoConductor.prototype.id,
  BloqueoConductorRelations
> {

  public readonly conductor: BelongsToAccessor<Conductor, typeof BloqueoConductor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>,
  ) {
    super(BloqueoConductor, dataSource);
    this.conductor = this.createBelongsToAccessorFor('conductor', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductor', this.conductor.inclusionResolver);
  }
}
