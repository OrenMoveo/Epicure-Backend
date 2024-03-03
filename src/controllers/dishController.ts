import { Request, Response } from "express";
import dishService from "../services/dishService";

export const getSignatureDishes = async (req: Request, res: Response) => {
  try {
    const popularRestaurants = await dishService.getSignatureDishes();
    res.json(popularRestaurants);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
