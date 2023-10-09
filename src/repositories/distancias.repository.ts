import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Distancias, DistanciasRelations, Parada} from '../models';
import {ParadaRepository} from './parada.repository';

export class DistanciasRepository extends DefaultCrudRepository<
  Distancias,
  typeof Distancias.prototype.id,
  DistanciasRelations
> {

  public readonly origen: BelongsToAccessor<Parada, typeof Distancias.prototype.id>;

  public readonly destino: BelongsToAccessor<Parada, typeof Distancias.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ParadaRepository') protected paradaRepositoryGetter: Getter<ParadaRepository>,
  ) {
    super(Distancias, dataSource);
    this.destino = this.createBelongsToAccessorFor('destino', paradaRepositoryGetter,);
    this.registerInclusionResolver('destino', this.destino.inclusionResolver);
    this.origen = this.createBelongsToAccessorFor('origen', paradaRepositoryGetter,);
    this.registerInclusionResolver('origen', this.origen.inclusionResolver);
  }
}
