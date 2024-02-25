import express from "express";
import dotenv from "dotenv";

import { connectToDB } from "./db";

dotenv.config();

const app: express.Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Epicure API is running");
});

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
