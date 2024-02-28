import { Request, Response } from "express";

import Restaurant from "../models/restaurant";
import Chef from "../models/chef";
import Dish from "../models/dish";

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find().populate("chef", "name", Chef);
    res.json(restaurants);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

export const getPopularRestaurants = async (req: Request, res: Response) => {
  try {
    const popularRestaurants = await Restaurant.find({
      isPopular: true,
    }).populate("chef", "name", Chef);
    res.json(popularRestaurants);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId)
      .populate({
        path: "restaurantDishes",
        model: Dish,
        populate: {
          path: "restaurant",
          model: Restaurant,
          select: "name",
        },
      })
      .populate({
        path: "chef",
        model: Chef,
      });

    if (!restaurant) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
