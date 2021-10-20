import { apiConfig } from "./config";
import express from 'express';
import { init } from "./app/infrastructure/webApi/loaders";

const startServer = async () => {

  const app = express();
  await init(app);
  app.listen(apiConfig.port, () => {
    console.log(`Listening ${apiConfig.name} on port ${apiConfig.port}!`);
  });
};

startServer();
