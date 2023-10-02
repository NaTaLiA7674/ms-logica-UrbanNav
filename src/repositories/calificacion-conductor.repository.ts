import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {CalificacionConductor, CalificacionConductorRelations, Viaje} from '../models';
import {ViajeRepository} from './viaje.repository';

export class CalificacionConductorRepository extends DefaultCrudRepository<
  CalificacionConductor,
  typeof CalificacionConductor.prototype.id,
  CalificacionConductorRelations
> {

  public readonly viaje: BelongsToAccessor<Viaje, typeof CalificacionConductor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>,
  ) {
    super(CalificacionConductor, dataSource);
    this.viaje = this.createBelongsToAccessorFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
  }
}
