const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Medication',
  tableName: 'medications',
  columns: {
    id: { primary: true, type: 'uuid', generated: 'uuid' },
    name: { type: 'varchar' },
    dosage: { type: 'varchar', nullable: true },
    schedule: { type: 'varchar', nullable: true },
    createdAt: { type: 'timestamp', createDate: true }
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'userId' },
      nullable: false,
      onDelete: 'CASCADE'
    }
  }
});
