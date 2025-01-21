import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

let sequelize: Sequelize;

// Production environment (Render)
if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL!, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
      decimalNumbers: true
    },
    logging: false
  });
} else {
  // Local development environment
  sequelize = new Sequelize(process.env.DB_NAME || 'kanban_db', 
    process.env.DB_USER || 'postgres', 
    process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
      logging: false
    });
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
