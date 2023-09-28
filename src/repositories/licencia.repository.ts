import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Licencia, LicenciaRelations} from '../models';

export class LicenciaRepository extends DefaultCrudRepository<
  Licencia,
  typeof Licencia.prototype.id,
  LicenciaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Licencia, dataSource);
  }
}
