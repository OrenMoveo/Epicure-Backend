import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectToDB } from "./db";
import restaurantsRouter from "./routes/restaurantRoutes";
import { appRoutes } from "./shared/constants";
import dishRouter from "./routes/dishRoutes";
import chefRouter from "./routes/chefRoutes";
import userRouter from "./routes/userRoutes";
import protectedRouter from "./routes/protectedRoute";

dotenv.config();

const app: express.Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(cors());
app.use(express.json());

app.use(appRoutes.restaurants.base, restaurantsRouter);
app.use(appRoutes.dishes.base, dishRouter);
app.use(appRoutes.chefs.base, chefRouter);
app.use(appRoutes.user.base, userRouter);
app.use(appRoutes.protected.base, protectedRouter);

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
