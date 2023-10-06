import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, Viaje, Factura, MedioPago, BloqueoCliente, CalificacionCliente, CalificacionConductor} from '../models';
import {ViajeRepository} from './viaje.repository';
import {FacturaRepository} from './factura.repository';
import {MedioPagoRepository} from './medio-pago.repository';
import {BloqueoClienteRepository} from './bloqueo-cliente.repository';
import {CalificacionClienteRepository} from './calificacion-cliente.repository';
import {CalificacionConductorRepository} from './calificacion-conductor.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly viaje: HasManyRepositoryFactory<Viaje, typeof Cliente.prototype.id>;

  public readonly factura: HasManyRepositoryFactory<Factura, typeof Cliente.prototype.id>;

  public readonly medioPago: HasManyRepositoryFactory<MedioPago, typeof Cliente.prototype.id>;

  public readonly bloqueoCliente: HasManyRepositoryFactory<BloqueoCliente, typeof Cliente.prototype.id>;

  public readonly calificacionCliente: HasManyRepositoryFactory<CalificacionCliente, typeof Cliente.prototype.id>;

  public readonly calificacionConductor: HasManyRepositoryFactory<CalificacionConductor, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('MedioPagoRepository') protected medioPagoRepositoryGetter: Getter<MedioPagoRepository>, @repository.getter('BloqueoClienteRepository') protected bloqueoClienteRepositoryGetter: Getter<BloqueoClienteRepository>, @repository.getter('CalificacionClienteRepository') protected calificacionClienteRepositoryGetter: Getter<CalificacionClienteRepository>, @repository.getter('CalificacionConductorRepository') protected calificacionConductorRepositoryGetter: Getter<CalificacionConductorRepository>,
  ) {
    super(Cliente, dataSource);
    this.calificacionConductor = this.createHasManyRepositoryFactoryFor('calificacionConductor', calificacionConductorRepositoryGetter,);
    this.registerInclusionResolver('calificacionConductor', this.calificacionConductor.inclusionResolver);
    this.calificacionCliente = this.createHasManyRepositoryFactoryFor('calificacionCliente', calificacionClienteRepositoryGetter,);
    this.registerInclusionResolver('calificacionCliente', this.calificacionCliente.inclusionResolver);
    this.bloqueoCliente = this.createHasManyRepositoryFactoryFor('bloqueoCliente', bloqueoClienteRepositoryGetter,);
    this.registerInclusionResolver('bloqueoCliente', this.bloqueoCliente.inclusionResolver);
    this.medioPago = this.createHasManyRepositoryFactoryFor('medioPago', medioPagoRepositoryGetter,);
    this.registerInclusionResolver('medioPago', this.medioPago.inclusionResolver);
    this.factura = this.createHasManyRepositoryFactoryFor('factura', facturaRepositoryGetter,);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
    this.viaje = this.createHasManyRepositoryFactoryFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
  }
}
