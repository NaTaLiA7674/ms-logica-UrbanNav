import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {MedioPago, MedioPagoRelations} from '../models';

export class MedioPagoRepository extends DefaultCrudRepository<
  MedioPago,
  typeof MedioPago.prototype.id,
  MedioPagoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(MedioPago, dataSource);
  }
}
