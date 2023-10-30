import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Ciudad, Parada, ParadaRelations, Viaje, Distancias, Conductor, UbicacionConductor} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {ViajeRepository} from './viaje.repository';
import {DistanciasRepository} from './distancias.repository';
import {UbicacionConductorRepository} from './ubicacion-conductor.repository';
import {ConductorRepository} from './conductor.repository';

export class ParadaRepository extends DefaultCrudRepository<
  Parada,
  typeof Parada.prototype.id,
  ParadaRelations
> {


  public readonly ubicacion: BelongsToAccessor<Ciudad, typeof Parada.prototype.id>;

  public readonly viaje: HasManyRepositoryFactory<Viaje, typeof Parada.prototype.id>;

  public readonly distancia: HasManyRepositoryFactory<Distancias, typeof Parada.prototype.id>;

  public readonly paradaCercana: HasManyThroughRepositoryFactory<Conductor, typeof Conductor.prototype.id,
          UbicacionConductor,
          typeof Parada.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>, @repository.getter('DistanciasRepository') protected distanciasRepositoryGetter: Getter<DistanciasRepository>, @repository.getter('UbicacionConductorRepository') protected ubicacionConductorRepositoryGetter: Getter<UbicacionConductorRepository>, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>,
  ) {
    super(Parada, dataSource);
    this.paradaCercana = this.createHasManyThroughRepositoryFactoryFor('paradaCercana', conductorRepositoryGetter, ubicacionConductorRepositoryGetter,);
    this.registerInclusionResolver('paradaCercana', this.paradaCercana.inclusionResolver);
    this.distancia = this.createHasManyRepositoryFactoryFor('distancia', distanciasRepositoryGetter,);
    this.registerInclusionResolver('distancia', this.distancia.inclusionResolver);
    this.viaje = this.createHasManyRepositoryFactoryFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
    this.ubicacion = this.createBelongsToAccessorFor('ubicacion', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ubicacion', this.ubicacion.inclusionResolver);
  }
}
