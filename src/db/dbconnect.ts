import { Client } from "pg";
import dotenv from 'dotenv';
dotenv.config()

const client =new Client({
    "host": process.env.DB_HOSTNAME,
    "user": process.env.DB_USERNAME,
     port: 5000 ,
    "password":process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
})

export default client;
