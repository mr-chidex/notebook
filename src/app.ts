import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import config from './config';
import { error } from './middlewares/logger';
import { authRoutes, noteRoutes, userRoutes } from './routes';
import { authUser } from './middlewares';

const app: Application = express();
const apiVersion = config.API_VERSION || 'v1';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.disable('x-powered-by');

app.use(`/api/${apiVersion}/auth`, authRoutes);
app.use(`/api/${apiVersion}/notes`, authUser, noteRoutes);
app.use(`/api/${apiVersion}/users`, authUser, userRoutes);

// error handler
app.use(error);

export default app;
