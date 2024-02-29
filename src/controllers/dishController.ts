import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import Dish from "../models/dish";

export const getSignatureDishes = async (req: Request, res: Response) => {
  try {
    const popularRestaurants = await Dish.find({
      signatureDish: true,
    }).populate({ path: "restaurant", model: Restaurant, select: "name" });
    res.json(popularRestaurants);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};


