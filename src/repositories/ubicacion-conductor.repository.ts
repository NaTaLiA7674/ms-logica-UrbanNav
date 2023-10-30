import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {UbicacionConductor, UbicacionConductorRelations} from '../models';

export class UbicacionConductorRepository extends DefaultCrudRepository<
  UbicacionConductor,
  typeof UbicacionConductor.prototype.id,
  UbicacionConductorRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(UbicacionConductor, dataSource);
  }
}
