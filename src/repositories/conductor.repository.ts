import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Conductor, ConductorRelations, Vehiculo, Licencia, Viaje, EstadoConductor, BloqueoConductor, CalificacionCliente, CalificacionConductor} from '../models';
import {VehiculoRepository} from './vehiculo.repository';
import {LicenciaRepository} from './licencia.repository';
import {ViajeRepository} from './viaje.repository';
import {EstadoConductorRepository} from './estado-conductor.repository';
import {BloqueoConductorRepository} from './bloqueo-conductor.repository';
import {CalificacionClienteRepository} from './calificacion-cliente.repository';
import {CalificacionConductorRepository} from './calificacion-conductor.repository';

export class ConductorRepository extends DefaultCrudRepository<
  Conductor,
  typeof Conductor.prototype.id,
  ConductorRelations
> {

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Conductor.prototype.id>;

  public readonly licencia: BelongsToAccessor<Licencia, typeof Conductor.prototype.id>;

  public readonly viaje: HasManyRepositoryFactory<Viaje, typeof Conductor.prototype.id>;

  public readonly estadoConductor: HasManyRepositoryFactory<EstadoConductor, typeof Conductor.prototype.id>;

  public readonly bloqueoConductor: HasManyRepositoryFactory<BloqueoConductor, typeof Conductor.prototype.id>;

  public readonly calificacionCliente: HasManyRepositoryFactory<CalificacionCliente, typeof Conductor.prototype.id>;

  public readonly calificacionConductor: HasManyRepositoryFactory<CalificacionConductor, typeof Conductor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('LicenciaRepository') protected licenciaRepositoryGetter: Getter<LicenciaRepository>, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>, @repository.getter('EstadoConductorRepository') protected estadoConductorRepositoryGetter: Getter<EstadoConductorRepository>, @repository.getter('BloqueoConductorRepository') protected bloqueoConductorRepositoryGetter: Getter<BloqueoConductorRepository>, @repository.getter('CalificacionClienteRepository') protected calificacionClienteRepositoryGetter: Getter<CalificacionClienteRepository>, @repository.getter('CalificacionConductorRepository') protected calificacionConductorRepositoryGetter: Getter<CalificacionConductorRepository>,
  ) {
    super(Conductor, dataSource);
    this.calificacionConductor = this.createHasManyRepositoryFactoryFor('calificacionConductor', calificacionConductorRepositoryGetter,);
    this.registerInclusionResolver('calificacionConductor', this.calificacionConductor.inclusionResolver);
    this.calificacionCliente = this.createHasManyRepositoryFactoryFor('calificacionCliente', calificacionClienteRepositoryGetter,);
    this.registerInclusionResolver('calificacionCliente', this.calificacionCliente.inclusionResolver);
    this.bloqueoConductor = this.createHasManyRepositoryFactoryFor('bloqueoConductor', bloqueoConductorRepositoryGetter,);
    this.registerInclusionResolver('bloqueoConductor', this.bloqueoConductor.inclusionResolver);
    this.estadoConductor = this.createHasManyRepositoryFactoryFor('estadoConductor', estadoConductorRepositoryGetter,);
    this.registerInclusionResolver('estadoConductor', this.estadoConductor.inclusionResolver);
    this.viaje = this.createHasManyRepositoryFactoryFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
    this.licencia = this.createBelongsToAccessorFor('licencia', licenciaRepositoryGetter,);
    this.registerInclusionResolver('licencia', this.licencia.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
