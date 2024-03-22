import { Sequelize } from 'sequelize';
import { Client } from "pg"
import dotenv from 'dotenv';

dotenv.config()



const dbName=process.env.DB_NAME  as string;
const dbHost= process.env.DB_HOST as string;
const dbUsername= process.env.DB_USERNAME as string;
const dbPassword=process.env.DB_PASSWORD as string
const dbDialect="postgres"


const client = new Client(process.env.DB_URL as string);


const sequelizeConnection = new Sequelize(process.env.DB_URL as string, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });

export { client, sequelizeConnection}

