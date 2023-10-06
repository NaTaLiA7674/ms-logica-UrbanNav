import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {CalificacionConductor, Cliente, Viaje} from '../models';
import {ClienteRepository} from '../repositories';
import {CalificacionConductorRepository} from '../repositories/calificacion-conductor.repository';

export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @repository(CalificacionConductorRepository)
    public calificacionConductorRepository: CalificacionConductorRepository,
  ) { }

  @post('/cliente')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.clienteRepository.create(cliente);
  }

  @get('/cliente/count')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @get('/cliente')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.clienteRepository.find(filter);
  }

  @patch('/cliente')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @get('/cliente/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @get('/cliente/{id}/historial-viajes', {
    responses: {
      '200': {
        description: 'Historial de viajes de un cliente',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Viaje),
            },
          },
        },
      },
    },
  })
  async obtenerHistorialViajes(
    @param.path.number('id') id: number,
  ): Promise<Viaje[]> {
    try {
      // Utiliza el repositorio del cliente para obtener el historial de viajes del cliente
      const cliente = await this.clienteRepository.findById(id, {
        include: [{relation: 'viaje'}], // Usar un arreglo de objetos InclusionFilter
      });

      if (!cliente) {
        throw new Error('Cliente no encontrado');
      }

      return cliente.viaje || [];
    } catch (error) {
      console.error('Error al obtener el historial de viajes del cliente', error);
      throw new HttpErrors.InternalServerError('No se pudo obtener el historial de viajes del cliente');
    }
  }

  @get('/clientes/{id}/historial-comentarios', {
    responses: {
      '200': {
        description: 'Historial de comentarios de los conductores para un cliente',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CalificacionConductor),
            },
          },
        },
      },
    },
  })
  async obtenerHistorialComentarios(
    @param.path.number('id') id: number,
  ): Promise<CalificacionConductor[]> {
    try {
      // Aquí deberías obtener el historial de comentarios de conductores para el cliente con el ID especificado.
      // Esto podría implicar consultar tu base de datos utilizando el repositorio de CalificacionConductor y
      // filtrando las calificaciones por el ID del cliente.
      const historialComentarios = await this.calificacionConductorRepository.find({
        where: {
          clienteId: id,
        },
      });

      return historialComentarios;
    } catch (error) {
      console.error('Error al obtener el historial de comentarios de conductores', error);
      throw new HttpErrors.InternalServerError('No se pudo obtener el historial de comentarios de conductores');
    }
  }

  @patch('/cliente/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/cliente/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/cliente/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
}
