import express from "express";
import { appRoutes } from "../shared/constants";
import * as restaurantController from "../controllers/restaurantController";
import { validate } from "../validators/validate";
import {
  createRestaurantValidationSchema,
  updateRestaurantValidationSchema,
} from "../validators/restaurantValidationScheme";

const restaurantRouter = express.Router();

restaurantRouter.post(
  appRoutes.restaurants.addRestaurant,
  validate(createRestaurantValidationSchema),
  restaurantController.addRestaurant
);

restaurantRouter.put(
  appRoutes.restaurants.updateRestaurantById,
  validate(updateRestaurantValidationSchema),
  restaurantController.updateRestaurantById
);

restaurantRouter.delete(
  appRoutes.restaurants.removeRestaurantById,
  restaurantController.removeRestaurantById
);

restaurantRouter.get(
  appRoutes.restaurants.newRestaurants,
  restaurantController.getNewRestaurants
);

restaurantRouter.get(
  appRoutes.restaurants.openNowRestaurants,
  restaurantController.getOpenNowRestaurants
);

restaurantRouter.get(
  appRoutes.restaurants.popularRestaurants,
  restaurantController.getPopularRestaurants
);

restaurantRouter.get(
  appRoutes.restaurants.allRestaurants,
  restaurantController.getAllRestaurants
);

restaurantRouter.get(
  appRoutes.restaurants.restaurantById,
  restaurantController.getRestaurantById
);

export default restaurantRouter;
