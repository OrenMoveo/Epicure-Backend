import express from "express";
import { restaurantsRoutes } from "../shared/constants";
import * as restaurantController from "../controllers/restaurantController";

const restaurantRouter = express.Router();

restaurantRouter.get(
  restaurantsRoutes.popularRestaurants,
  restaurantController.getPopularRestaurants
);

restaurantRouter.get(
  restaurantsRoutes.allRestaurants,
  restaurantController.getAllRestaurants
);

restaurantRouter.get(
  restaurantsRoutes.singleRestaurant,
  restaurantController.getRestaurantById
);

export default restaurantRouter;
