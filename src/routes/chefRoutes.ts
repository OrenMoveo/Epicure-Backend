import express from "express";
import * as chefController from "../controllers/chefController";
import { appRoutes } from "../shared/constants";
import { validate } from "../validators/validate";
import {
  createChefValidationSchema,
  updateChefValidationSchema,
} from "../validators/chefValidationScheme";

const chefRouter = express.Router();

chefRouter.get(appRoutes.chefs.chefOfTheWeek, chefController.getChefOfTheWeek);
chefRouter.post(
  appRoutes.chefs.addChef,
  validate(createChefValidationSchema),
  chefController.addChef
);
chefRouter.put(
  appRoutes.chefs.updateChefById,
  validate(updateChefValidationSchema),
  chefController.updateChefById
);
chefRouter.delete(
  appRoutes.chefs.removeChefById,
  chefController.removeChefById
);

chefRouter.get(appRoutes.chefs.newChefs, chefController.getNewChefs);
chefRouter.get(
  appRoutes.chefs.mostViewedChefs,
  chefController.getMostViewedChefs
);
chefRouter.get(appRoutes.chefs.allChefs, chefController.getAllChefs);
export default chefRouter;
