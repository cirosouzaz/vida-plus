const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Appointment',
  tableName: 'appointments',
  columns: {
    id: { primary: true, type: 'uuid', generated: 'uuid' },
    doctor: { type: 'varchar' },
    specialty: { type: 'varchar' },
    date: { type: 'timestamp' },
    notes: { type: 'text', nullable: true },
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
