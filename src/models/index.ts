import { Sequelize } from 'sequelize';
import { UserFactory } from './user';
import { ProductFactory } from './product';
import { TemplateFactory } from './template';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

const db = {
  sequelize,
  Sequelize,
  User: UserFactory(sequelize),
  Product: ProductFactory(sequelize),
  Template: TemplateFactory(sequelize)
};

sequelize.sync(); // Sequelize sync

export default db;
