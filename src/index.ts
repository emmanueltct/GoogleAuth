import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import userRoutes from './routes/users';
import {client} from './db/dbCongig';
import passport from 'passport';
import session from "express-session"
import './passport'

//For env File 
dotenv.config();


const app: Application = express();
app.use(cors())
app.use(express.json())

app.use(session({
  secret: process.env.CLIENT_SECRET as string,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())

const port = 8080;


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use('/api/users',userRoutes)
app.listen(port, () => {
    console.log(`Server is is connected and running at http://localhost:${port}`);
    client.connect() 
    .then(() => { console.log('Connected to PostgreSQL database!'); }) 
    .catch((err) => { console.error('Error connecting to the database:', err); });
});
