import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectToDB } from "./db";
import restaurantsRouter from "./routes/restaurantRoutes";
import { appRoutes } from "./shared/constants";

dotenv.config();

const app: express.Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(cors());
app.use(express.json());

app.get(appRoutes.base, (req, res) => {
  res.send("Epicure API is running");
});

app.use(appRoutes.restaurants, restaurantsRouter);

connectToDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });

export default app;
