import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

let sequelize: Sequelize;

// Production environment (Render)
if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL); 
 } else {
  sequelize = new Sequelize(
    process.env.DB_NAME || 'kanban_db', 
    process.env.DB_USER || 'postgress',
    process.env.DB_PASSWORD || '1234', {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
      logging: false
    },
  );
}

// Initialize models
const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

// Set up associations
User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser'});

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Run connection test
testConnection();

export { sequelize, User, Ticket };
