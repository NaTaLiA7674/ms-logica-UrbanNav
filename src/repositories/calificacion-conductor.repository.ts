import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {CalificacionConductor, CalificacionConductorRelations} from '../models';

export class CalificacionConductorRepository extends DefaultCrudRepository<
  CalificacionConductor,
  typeof CalificacionConductor.prototype.id,
  CalificacionConductorRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(CalificacionConductor, dataSource);
  }
}
