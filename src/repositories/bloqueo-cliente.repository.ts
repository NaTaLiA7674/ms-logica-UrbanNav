import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {BloqueoCliente, BloqueoClienteRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class BloqueoClienteRepository extends DefaultCrudRepository<
  BloqueoCliente,
  typeof BloqueoCliente.prototype.id,
  BloqueoClienteRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof BloqueoCliente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(BloqueoCliente, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
