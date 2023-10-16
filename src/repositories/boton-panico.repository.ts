import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {BotonPanico, BotonPanicoRelations, Cliente, Conductor, Viaje} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ConductorRepository} from './conductor.repository';
import {ViajeRepository} from './viaje.repository';

export class BotonPanicoRepository extends DefaultCrudRepository<
  BotonPanico,
  typeof BotonPanico.prototype.id,
  BotonPanicoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof BotonPanico.prototype.id>;

  public readonly conductor: BelongsToAccessor<Conductor, typeof BotonPanico.prototype.id>;

  public readonly viaje: BelongsToAccessor<Viaje, typeof BotonPanico.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>,
  ) {
    super(BotonPanico, dataSource);
    this.viaje = this.createBelongsToAccessorFor('viaje', viajeRepositoryGetter,);
    this.registerInclusionResolver('viaje', this.viaje.inclusionResolver);
    this.conductor = this.createBelongsToAccessorFor('conductor', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductor', this.conductor.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
