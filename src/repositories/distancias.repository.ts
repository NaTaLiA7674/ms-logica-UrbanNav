import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Distancias, DistanciasRelations} from '../models';

export class DistanciasRepository extends DefaultCrudRepository<
  Distancias,
  typeof Distancias.prototype.id,
  DistanciasRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Distancias, dataSource);
  }
}
