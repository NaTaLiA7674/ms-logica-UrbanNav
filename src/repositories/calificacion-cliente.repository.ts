import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {CalificacionCliente, CalificacionClienteRelations} from '../models';

export class CalificacionClienteRepository extends DefaultCrudRepository<
  CalificacionCliente,
  typeof CalificacionCliente.prototype.id,
  CalificacionClienteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(CalificacionCliente, dataSource);
  }
}
