import express from "express";
import * as dishController from "../controllers/dishController";
import { dishRoutes} from "../shared/constants";

const dishRouter = express.Router();

dishRouter.get(
  dishRoutes.signatureDishes,
  dishController.getSignatureDishes
);

// dishRouter.get(
//   homePageRoutes.chefOfTheWeek,
//   homePageController.getChefOfTheWeek
// );

export default dishRouter;
