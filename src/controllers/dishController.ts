import { Request, Response } from "express";
import dishService from "../services/dishService";

export const getSignatureDishes = async (req: Request, res: Response) => {
  try {
    const signatureDishes = await dishService.getSignatureDishes();
    if (!signatureDishes) {
      return res.status(404).json({ error: "Signature Dishes not found" });
    }
    res.json(signatureDishes);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const addDish = async (req: Request, res: Response) => {
  try {
    const newDishData = req.body;
    const newDish = await dishService.addDish(newDishData);
    if (!newDish) {
      return res
        .status(400)
        .json({ error: "Bad Request, Dish was not created successfully" });
    }
    res.json(newDish);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const updateDishById = async (req: Request, res: Response) => {
  try {
    const DishId = req.params.id;
    const updateData = req.body;
    const updatedDish = await dishService.updateDishById(DishId, updateData);
    if (!updatedDish) {
      return res
        .status(400)
        .json({ error: "Bad Request, Dish was not updated successfully" });
    }
    res.json(updatedDish);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const removeDishById = async (req: Request, res: Response) => {
  try {
    const DishId = req.params.id;
    const removedDish = await dishService.removeDishById(DishId);
    if (!removedDish) {
      return res.status(404).json({ error: "Dish to remove not found" });
    }
    res.json(removedDish);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
