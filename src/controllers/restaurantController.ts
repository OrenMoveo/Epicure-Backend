import { Request, Response } from "express";
import restaurantService from "../services/restaurantService";

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await restaurantService.getAllRestaurants();
    res.json(restaurants);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const getPopularRestaurants = async (req: Request, res: Response) => {
  try {
    const popularRestaurants = await restaurantService.getPopularRestaurants();
    res.json(popularRestaurants);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await restaurantService.getRestaurantById(restaurantId);
    res.json(restaurant);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const addNewRestaurant = async (req: Request, res: Response) => {
  try {
    const newRestaurantData = req.body; 
    const newRestaurant = await restaurantService.addNewRestaurant(newRestaurantData);
    res.json(newRestaurant);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
