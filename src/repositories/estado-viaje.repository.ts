import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {EstadoViaje, EstadoViajeRelations, Viaje} from '../models';
import {ViajeRepository} from './viaje.repository';

export class EstadoViajeRepository extends DefaultCrudRepository<
  EstadoViaje,
  typeof EstadoViaje.prototype.id,
  EstadoViajeRelations
> {

  public readonly viaje: BelongsToAccessor<Viaje, typeof EstadoViaje.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>,
  ) {
    super(EstadoViaje, dataSource);
    this.viaje = this.createBelongsToAccessorFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
  }
}
