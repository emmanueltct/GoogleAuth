import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import userRoutes from './routes/users';
import client from './db/dbconnect';
//For env File 
dotenv.config();

const app: Application = express();
app.use(cors())
app.use(express.json())
app.use('/api/users',userRoutes)

const port = process.env.PORT || 6000;


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
    console.log(`Server is is connected and running at http://localhost:${port}`);
    client.connect() 
    .then(() => { console.log('Connected to PostgreSQL database!'); }) 
    .catch((err) => { console.error('Error connecting to the database:', err); });
});
