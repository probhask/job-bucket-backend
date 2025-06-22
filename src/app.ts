import config from '@config/config';
import express from 'express';
import routes from '@/routes/index.route';
import cors from 'cors';
import { successHandler, errorHandler } from '@/config/morgan';

const app = express();

export const server = app.listen(config.port, async () => {
  console.log(`Server is running on port ${config.port} in ${config.env} mode`);
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ✅ Log all successful requests
app.use(successHandler);
// ✅ Log all error responses
app.use(errorHandler);

app.use(cors());
// app.options('/*', cors());

app.use('/api/v1', routes);

export default app;
