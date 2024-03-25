import dotenv from 'dotenv';
dotenv.config()
module.exports={

 "development": {
    "username": process.env.USERNAME,
    "password":process.env.DB_PASSWORD,
    "database": process.env.DB_HOSTNAME,
    "port": process.env.DB_PORT,
    "host":process.env.DB_HOSTNAME,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}