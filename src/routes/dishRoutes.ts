import express from "express";
import * as dishController from "../controllers/dishController";
import { appRoutes } from "../shared/constants";

const dishRouter = express.Router();

dishRouter.get(
  appRoutes.dishes.signatureDishes,
  dishController.getSignatureDishes
);

export default dishRouter;
