import { Request, Response } from "express";
import restaurantService from "../services/restaurantService";

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await restaurantService.getAllRestaurants();
    if (!restaurants) {
      return res.status(404).json({ error: "Restaurants not found" });
    }
    res.json(restaurants);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const getPopularRestaurants = async (req: Request, res: Response) => {
  try {
    const popularRestaurants = await restaurantService.getPopularRestaurants();
    if (!popularRestaurants) {
      return res.status(404).json({ error: "Popular Restaurants not found" });
    }
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
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const addRestaurant = async (req: Request, res: Response) => {
  try {
    const newRestaurantData = req.body;
    const newRestaurant = await restaurantService.addRestaurant(
      newRestaurantData
    );
    if (!newRestaurant) {
      return res.status(400).json({
        error: "Bad Request, Restaurant was not created successfully not found",
      });
    }
    res.json(newRestaurant);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const updateRestaurantById = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const updateData = req.body;
    const updatedRestaurant = await restaurantService.updateRestaurantById(
      restaurantId,
      updateData
    );
    if (!updatedRestaurant) {
      return res.status(400).json({
        error: "Bad Request, Restaurant was not updated successfully not found",
      });
    }
    res.json(updatedRestaurant);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const removeRestaurantById = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const removedRestaurant = await restaurantService.removeRestaurantById(
      restaurantId
    );
    if (!removedRestaurant) {
      return res.status(404).json({ error: "Restaurant to remove not found" });
    }
    res.json(removedRestaurant);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
