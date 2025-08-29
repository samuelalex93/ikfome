import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from "./routes/routes";
import * as swaggerDocument from '../swagger.json';
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(bodyParser.json());

RegisterRoutes(app);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("Swagger docs at http://localhost:3000/docs");
});
