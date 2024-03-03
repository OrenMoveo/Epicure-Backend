import express from "express";
import { appRoutes } from "../shared/constants";
import * as restaurantController from "../controllers/restaurantController";

const restaurantRouter = express.Router();

restaurantRouter.get(
  appRoutes.restaurants.popularRestaurants,
  restaurantController.getPopularRestaurants
);

restaurantRouter.get(
  appRoutes.restaurants.allRestaurants,
  restaurantController.getAllRestaurants
);

restaurantRouter.post(
  appRoutes.restaurants.addRestaurant,
  restaurantController.addRestaurant
);

restaurantRouter.put(
  appRoutes.restaurants.updateRestaurantById,
  restaurantController.updateRestaurantById
);

restaurantRouter.delete(
  appRoutes.restaurants.removeRestaurantById,
  restaurantController.removeRestaurantById
);

restaurantRouter.get(
  appRoutes.restaurants.restaurantById,
  restaurantController.getRestaurantById
);

export default restaurantRouter;
