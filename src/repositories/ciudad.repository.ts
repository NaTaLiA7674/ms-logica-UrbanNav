import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Parada} from '../models';
import {ParadaRepository} from './parada.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly parada: HasManyRepositoryFactory<Parada, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ParadaRepository') protected paradaRepositoryGetter: Getter<ParadaRepository>,
  ) {
    super(Ciudad, dataSource);
    this.parada = this.createHasManyRepositoryFactoryFor('parada', paradaRepositoryGetter,);
    this.registerInclusionResolver('parada', this.parada.inclusionResolver);
  }
}
