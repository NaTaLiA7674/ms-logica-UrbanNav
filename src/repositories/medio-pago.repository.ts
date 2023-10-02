import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {MedioPago, MedioPagoRelations, Factura, Cliente} from '../models';
import {FacturaRepository} from './factura.repository';
import {ClienteRepository} from './cliente.repository';

export class MedioPagoRepository extends DefaultCrudRepository<
  MedioPago,
  typeof MedioPago.prototype.id,
  MedioPagoRelations
> {

  public readonly factura: HasManyRepositoryFactory<Factura, typeof MedioPago.prototype.id>;

  public readonly cliente: HasManyRepositoryFactory<Cliente, typeof MedioPago.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(MedioPago, dataSource);
    this.cliente = this.createHasManyRepositoryFactoryFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.factura = this.createHasManyRepositoryFactoryFor('factura', facturaRepositoryGetter,);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
  }
}
