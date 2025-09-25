import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import roleRoutes from './routes/role.routes';
import authRoutes from './routes/auth.routes';
import { notFound } from './middlewares/notFound.middleware';
import { errorHandler } from './middlewares/error.middleware';
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();

setupSwagger(app);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
