const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: { primary: true, type: 'uuid', generated: 'uuid' },
    name: { type: 'varchar' },
    email: { type: 'varchar', unique: true },
    password: { type: 'varchar' },
    cep: { type: 'varchar', nullable: true },
    street: { type: 'varchar', nullable: true },
    neighborhood: { type: 'varchar', nullable: true },
    city: { type: 'varchar', nullable: true },
    state: { type: 'varchar', nullable: true },
    createdAt: { type: 'timestamp', createDate: true }
  }
});
