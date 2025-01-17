import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file

console.log('Database URL:', process.env.DB_URL);
console.log('Database Name:', process.env.DB_NAME);
console.log('Database User:', process.env.DB_USER);
console.log('Database Password:', process.env.DB_PASSWORD);

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

// Initialize Sequelize with environment variables for database connection
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
        ssl: {
          require: true,
          rejectUnauthorized: false,
        }
      },
    });

const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

// Define model relationships
User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });

export { sequelize, User, Ticket };
