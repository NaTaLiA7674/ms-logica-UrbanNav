import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {BloqueoConductor, BotonPanico, CalificacionCliente, CalificacionConductor, Conductor, ConductorRelations, Licencia, UbicacionConductor, Vehiculo, Viaje} from '../models';
import {BloqueoConductorRepository} from './bloqueo-conductor.repository';
import {BotonPanicoRepository} from './boton-panico.repository';
import {CalificacionClienteRepository} from './calificacion-cliente.repository';
import {CalificacionConductorRepository} from './calificacion-conductor.repository';
import {LicenciaRepository} from './licencia.repository';
import {ParadaRepository} from './parada.repository';
import {UbicacionConductorRepository} from './ubicacion-conductor.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {ViajeRepository} from './viaje.repository';

export class ConductorRepository extends DefaultCrudRepository<
  Conductor,
  typeof Conductor.prototype.id,
  ConductorRelations
> {

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Conductor.prototype.id>;

  public readonly licencia: BelongsToAccessor<Licencia, typeof Conductor.prototype.id>;

  public readonly viaje: HasManyRepositoryFactory<Viaje, typeof Conductor.prototype.id>;

  public readonly bloqueoConductor: HasManyRepositoryFactory<BloqueoConductor, typeof Conductor.prototype.id>;

  public readonly calificacionCliente: HasManyRepositoryFactory<CalificacionCliente, typeof Conductor.prototype.id>;

  public readonly calificacionConductor: HasManyRepositoryFactory<CalificacionConductor, typeof Conductor.prototype.id>;

  public readonly botonPanico: HasManyRepositoryFactory<BotonPanico, typeof Conductor.prototype.id>;

  public readonly ubicacionConductor: HasManyRepositoryFactory<UbicacionConductor, typeof Conductor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('LicenciaRepository') protected licenciaRepositoryGetter: Getter<LicenciaRepository>, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>, @repository.getter('BloqueoConductorRepository') protected bloqueoConductorRepositoryGetter: Getter<BloqueoConductorRepository>, @repository.getter('CalificacionClienteRepository') protected calificacionClienteRepositoryGetter: Getter<CalificacionClienteRepository>, @repository.getter('CalificacionConductorRepository') protected calificacionConductorRepositoryGetter: Getter<CalificacionConductorRepository>, @repository.getter('BotonPanicoRepository') protected botonPanicoRepositoryGetter: Getter<BotonPanicoRepository>, @repository.getter('ParadaRepository') protected paradaRepositoryGetter: Getter<ParadaRepository>, @repository.getter('UbicacionConductorRepository') protected ubicacionConductorRepositoryGetter: Getter<UbicacionConductorRepository>,
  ) {
    super(Conductor, dataSource);
    this.ubicacionConductor = this.createHasManyRepositoryFactoryFor('ubicacionConductor', ubicacionConductorRepositoryGetter,);
    this.registerInclusionResolver('ubicacionConductor', this.ubicacionConductor.inclusionResolver);
    this.botonPanico = this.createHasManyRepositoryFactoryFor('botonPanico', botonPanicoRepositoryGetter,);
    this.registerInclusionResolver('botonPanico', this.botonPanico.inclusionResolver);
    this.calificacionConductor = this.createHasManyRepositoryFactoryFor('calificacionConductor', calificacionConductorRepositoryGetter,);
    this.registerInclusionResolver('calificacionConductor', this.calificacionConductor.inclusionResolver);
    this.calificacionCliente = this.createHasManyRepositoryFactoryFor('calificacionCliente', calificacionClienteRepositoryGetter,);
    this.registerInclusionResolver('calificacionCliente', this.calificacionCliente.inclusionResolver);
    this.bloqueoConductor = this.createHasManyRepositoryFactoryFor('bloqueoConductor', bloqueoConductorRepositoryGetter,);
    this.registerInclusionResolver('bloqueoConductor', this.bloqueoConductor.inclusionResolver);
    this.viaje = this.createHasManyRepositoryFactoryFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
    this.licencia = this.createBelongsToAccessorFor('licencia', licenciaRepositoryGetter,);
    this.registerInclusionResolver('licencia', this.licencia.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
