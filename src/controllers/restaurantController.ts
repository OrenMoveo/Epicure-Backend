import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import Chef from "../models/chef";

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find();
    // const chef = await ChefModel.findById(restaurants[0].chef);
    // console.log(chef);
    // console.log(restaurants);
    res.json(restaurants);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }

    res.json(restaurant);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
