import config from '@config/config';
import express from 'express';

const app = express();

export const server = app.listen(config.port, async () => {
  console.log(`Server is running on port ${config.port} in ${config.env} mode`);
});

export default app;
