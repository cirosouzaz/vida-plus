module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'VidaPlus API',
    version: '1.0.0',
    description: 'Documentação da API VidaPlus para autenticação, consultas, medicamentos e lookup de endereço via CEP.'
  },
  servers: [
    {
      url: 'http://localhost:3001/api',
      description: 'Servidor local'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      UserRegister: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
          cep: { type: 'string' },
          street: { type: 'string' },
          neighborhood: { type: 'string' },
          city: { type: 'string' },
          state: { type: 'string' }
        },
        required: ['name', 'email', 'password']
      },
      UserLogin: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' }
        },
        required: ['email', 'password']
      },
      Appointment: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          doctor: { type: 'string' },
          specialty: { type: 'string' },
          date: { type: 'string', format: 'date-time' },
          notes: { type: 'string' }
        }
      },
      Medication: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          dosage: { type: 'string' },
          schedule: { type: 'string' }
        }
      }
    }
  },
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Cadastrar usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserRegister' }
            }
          }
        },
        responses: {
          '201': { description: 'Usuário criado' },
          '400': { description: 'Email já em uso' }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login de usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserLogin' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Token JWT gerado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { token: { type: 'string' } }
                }
              }
            }
          },
          '401': { description: 'Credenciais inválidas' }
        }
      }
    },
    '/users/address/{cep}': {
      get: {
        tags: ['Address'],
        summary: 'Buscar endereço por CEP',
        parameters: [
          {
            name: 'cep',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Endereço encontrado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    street: { type: 'string' },
                    neighborhood: { type: 'string' },
                    city: { type: 'string' },
                    state: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/appointments': {
      get: {
        tags: ['Appointments'],
        security: [{ bearerAuth: [] }],
        summary: 'Listar consultas',
        responses: {
          '200': {
            description: 'Lista de consultas',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Appointment' } }
              }
            }
          }
        }
      },
      post: {
        tags: ['Appointments'],
        security: [{ bearerAuth: [] }],
        summary: 'Criar consulta',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  doctor: { type: 'string' },
                  specialty: { type: 'string' },
                  date: { type: 'string', format: 'date-time' },
                  notes: { type: 'string' }
                },
                required: ['doctor', 'specialty', 'date']
              }
            }
          }
        },
        responses: { '201': { description: 'Consulta criada' } }
      }
    },
    '/appointments/{id}': {
      put: {
        tags: ['Appointments'],
        security: [{ bearerAuth: [] }],
        summary: 'Editar consulta',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  doctor: { type: 'string' },
                  specialty: { type: 'string' },
                  date: { type: 'string', format: 'date-time' },
                  notes: { type: 'string' }
                }
              }
            }
          }
        },
        responses: { '200': { description: 'Consulta atualizada' } }
      },
      delete: {
        tags: ['Appointments'],
        security: [{ bearerAuth: [] }],
        summary: 'Excluir consulta',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: { '204': { description: 'Consulta removida' } }
      }
    },
    '/medications': {
      get: {
        tags: ['Medications'],
        security: [{ bearerAuth: [] }],
        summary: 'Listar medicamentos',
        responses: {
          '200': {
            description: 'Lista de medicamentos',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Medication' } }
              }
            }
          }
        }
      },
      post: {
        tags: ['Medications'],
        security: [{ bearerAuth: [] }],
        summary: 'Criar medicamento',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  dosage: { type: 'string' },
                  schedule: { type: 'string' }
                },
                required: ['name']
              }
            }
          }
        },
        responses: { '201': { description: 'Medicamento criado' } }
      }
    },
    '/medications/{id}': {
      put: {
        tags: ['Medications'],
        security: [{ bearerAuth: [] }],
        summary: 'Editar medicamento',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  dosage: { type: 'string' },
                  schedule: { type: 'string' }
                }
              }
            }
          }
        },
        responses: { '200': { description: 'Medicamento atualizado' } }
      },
      delete: {
        tags: ['Medications'],
        security: [{ bearerAuth: [] }],
        summary: 'Excluir medicamento',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: { '204': { description: 'Medicamento removido' } }
      }
    }
  }
};
