import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Ciudad, Distancias, Parada, ParadaRelations, Viaje, UbicacionConductor} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {ConductorRepository} from './conductor.repository';
import {DistanciasRepository} from './distancias.repository';
import {ViajeRepository} from './viaje.repository';
import {UbicacionConductorRepository} from './ubicacion-conductor.repository';

export class ParadaRepository extends DefaultCrudRepository<
  Parada,
  typeof Parada.prototype.id,
  ParadaRelations
> {


  public readonly ubicacion: BelongsToAccessor<Ciudad, typeof Parada.prototype.id>;

  public readonly viaje: HasManyRepositoryFactory<Viaje, typeof Parada.prototype.id>;

  public readonly distancia: HasManyRepositoryFactory<Distancias, typeof Parada.prototype.id>;

  public readonly ubicacionConductor: HasManyRepositoryFactory<UbicacionConductor, typeof Parada.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>, @repository.getter('DistanciasRepository') protected distanciasRepositoryGetter: Getter<DistanciasRepository>, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>, @repository.getter('UbicacionConductorRepository') protected ubicacionConductorRepositoryGetter: Getter<UbicacionConductorRepository>,
  ) {
    super(Parada, dataSource);
    this.ubicacionConductor = this.createHasManyRepositoryFactoryFor('ubicacionConductor', ubicacionConductorRepositoryGetter,);
    this.registerInclusionResolver('ubicacionConductor', this.ubicacionConductor.inclusionResolver);
    this.distancia = this.createHasManyRepositoryFactoryFor('distancia', distanciasRepositoryGetter,);
    this.registerInclusionResolver('distancia', this.distancia.inclusionResolver);
    this.viaje = this.createHasManyRepositoryFactoryFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
    this.ubicacion = this.createBelongsToAccessorFor('ubicacion', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ubicacion', this.ubicacion.inclusionResolver);
  }
}
