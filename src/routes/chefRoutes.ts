import express from "express";
import * as chefController from "../controllers/chefController";
import { chefRoutes } from "../shared/constants";

const chefRouter = express.Router();

chefRouter.get(chefRoutes.chefOfTheWeek, chefController.getChefOfTheWeek);
chefRouter.get(chefRoutes.allChefs, chefController.getAllChefs);

export default chefRouter;
