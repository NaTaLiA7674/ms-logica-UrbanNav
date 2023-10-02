import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Licencia, LicenciaRelations, Conductor} from '../models';
import {ConductorRepository} from './conductor.repository';

export class LicenciaRepository extends DefaultCrudRepository<
  Licencia,
  typeof Licencia.prototype.id,
  LicenciaRelations
> {

  public readonly conductor: BelongsToAccessor<Conductor, typeof Licencia.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>,
  ) {
    super(Licencia, dataSource);
    this.conductor = this.createBelongsToAccessorFor('conductor', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductor', this.conductor.inclusionResolver);
  }
}
