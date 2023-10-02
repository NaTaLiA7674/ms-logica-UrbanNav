import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Factura, FacturaRelations, Viaje, MedioPago, Cliente} from '../models';
import {ViajeRepository} from './viaje.repository';
import {MedioPagoRepository} from './medio-pago.repository';
import {ClienteRepository} from './cliente.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly viaje: BelongsToAccessor<Viaje, typeof Factura.prototype.id>;

  public readonly medioPago: BelongsToAccessor<MedioPago, typeof Factura.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>, @repository.getter('MedioPagoRepository') protected medioPagoRepositoryGetter: Getter<MedioPagoRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Factura, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.medioPago = this.createBelongsToAccessorFor('medioPago', medioPagoRepositoryGetter,);
    this.registerInclusionResolver('medioPago', this.medioPago.inclusionResolver);
    this.viaje = this.createBelongsToAccessorFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
  }
}
