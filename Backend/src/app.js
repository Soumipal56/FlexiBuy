import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import productRoutes from './routes/product.routes.js';
import { notFound, errorHandler } from './middlewares/error.middleware.js';

const app = express();

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/products', productRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
