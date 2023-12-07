import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {UbicacionConductor, UbicacionConductorRelations, Conductor, Parada} from '../models';
import {ConductorRepository} from './conductor.repository';
import {ParadaRepository} from './parada.repository';

export class UbicacionConductorRepository extends DefaultCrudRepository<
  UbicacionConductor,
  typeof UbicacionConductor.prototype.id,
  UbicacionConductorRelations
> {

  public readonly conductor: BelongsToAccessor<Conductor, typeof UbicacionConductor.prototype.id>;

  public readonly origen: BelongsToAccessor<Parada, typeof UbicacionConductor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>, @repository.getter('ParadaRepository') protected paradaRepositoryGetter: Getter<ParadaRepository>,
  ) {
    super(UbicacionConductor, dataSource);
    this.origen = this.createBelongsToAccessorFor('origen', paradaRepositoryGetter,);
    this.registerInclusionResolver('origen', this.origen.inclusionResolver);
    this.conductor = this.createBelongsToAccessorFor('conductor', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductor', this.conductor.inclusionResolver);
  }
}
