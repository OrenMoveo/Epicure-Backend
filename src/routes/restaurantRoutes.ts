import express, { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import { restaurantsRoutes } from "../shared/constants";
import * as restaurantController from "../controllers/restaurantController";

const restaurantRouter = express.Router();

restaurantRouter.get(
  restaurantsRoutes.allRestaurants,
  restaurantController.getAllRestaurants
);

restaurantRouter.get(
  restaurantsRoutes.singleRestaurant,
  restaurantController.getRestaurantById
);

export default restaurantRouter;
