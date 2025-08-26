import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from "./routes/routes";
import * as swaggerDocument from '../swagger.json';

const app = express();
app.use(bodyParser.json());

RegisterRoutes(app);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("Swagger docs at http://localhost:3000/docs");
});
