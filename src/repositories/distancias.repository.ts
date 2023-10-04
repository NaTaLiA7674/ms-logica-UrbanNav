import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Distancias, DistanciasRelations, Parada} from '../models';
import {ParadaRepository} from './parada.repository';

export class DistanciasRepository extends DefaultCrudRepository<
  Distancias,
  typeof Distancias.prototype.id,
  DistanciasRelations
> {

  public readonly parada: HasManyRepositoryFactory<Parada, typeof Distancias.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ParadaRepository') protected paradaRepositoryGetter: Getter<ParadaRepository>,
  ) {
    super(Distancias, dataSource);
    this.parada = this.createHasManyRepositoryFactoryFor('parada', paradaRepositoryGetter,);
    this.registerInclusionResolver('parada', this.parada.inclusionResolver);
  }
}
