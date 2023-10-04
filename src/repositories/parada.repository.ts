import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Ciudad, Parada, ParadaRelations, Viaje, Distancias} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {ViajeRepository} from './viaje.repository';
import {DistanciasRepository} from './distancias.repository';

export class ParadaRepository extends DefaultCrudRepository<
  Parada,
  typeof Parada.prototype.id,
  ParadaRelations
> {

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Parada.prototype.id>;

  public readonly viaje: HasManyRepositoryFactory<Viaje, typeof Parada.prototype.id>;

  public readonly distancia: HasManyRepositoryFactory<Distancias, typeof Parada.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>, @repository.getter('DistanciasRepository') protected distanciasRepositoryGetter: Getter<DistanciasRepository>,
  ) {
    super(Parada, dataSource);
    this.distancia = this.createHasManyRepositoryFactoryFor('distancia', distanciasRepositoryGetter,);
    this.registerInclusionResolver('distancia', this.distancia.inclusionResolver);
    this.viaje = this.createHasManyRepositoryFactoryFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
