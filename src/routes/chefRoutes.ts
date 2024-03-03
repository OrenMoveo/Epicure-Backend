import express from "express";
import * as chefController from "../controllers/chefController";
import { appRoutes } from "../shared/constants";

const chefRouter = express.Router();

chefRouter.get(appRoutes.chefs.chefOfTheWeek, chefController.getChefOfTheWeek);
chefRouter.get(appRoutes.chefs.allChefs, chefController.getAllChefs);
chefRouter.post(appRoutes.chefs.addChef, chefController.addChef);
chefRouter.put(appRoutes.chefs.updateChefById, chefController.updateChefById);
chefRouter.delete(
  appRoutes.chefs.removeChefById,
  chefController.removeChefById
);

export default chefRouter;
