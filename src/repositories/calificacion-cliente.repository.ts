import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {CalificacionCliente, CalificacionClienteRelations, Viaje} from '../models';
import {ViajeRepository} from './viaje.repository';

export class CalificacionClienteRepository extends DefaultCrudRepository<
  CalificacionCliente,
  typeof CalificacionCliente.prototype.id,
  CalificacionClienteRelations
> {

  public readonly viaje: BelongsToAccessor<Viaje, typeof CalificacionCliente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>,
  ) {
    super(CalificacionCliente, dataSource);
    this.viaje = this.createBelongsToAccessorFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
  }
}
