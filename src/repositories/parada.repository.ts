import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Parada, ParadaRelations, Ciudad, Distancias, Viaje} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {DistanciasRepository} from './distancias.repository';
import {ViajeRepository} from './viaje.repository';

export class ParadaRepository extends DefaultCrudRepository<
  Parada,
  typeof Parada.prototype.id,
  ParadaRelations
> {

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Parada.prototype.id>;

  public readonly distancia: BelongsToAccessor<Distancias, typeof Parada.prototype.id>;

  public readonly viaje: HasManyRepositoryFactory<Viaje, typeof Parada.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('DistanciasRepository') protected distanciasRepositoryGetter: Getter<DistanciasRepository>, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>,
  ) {
    super(Parada, dataSource);
    this.viaje = this.createHasManyRepositoryFactoryFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
    this.distancia = this.createBelongsToAccessorFor('distancia', distanciasRepositoryGetter,);
    this.registerInclusionResolver('distancia', this.distancia.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
