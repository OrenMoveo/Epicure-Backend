import { Request, Response } from "express";
import dishService from "../services/dishService";

export const getSignatureDishes = async (req: Request, res: Response) => {
  try {
    const signatureDishes = await dishService.getSignatureDishes();
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
    const updatedDish = await dishService.updateDishById(
      DishId,
      updateData
    );
    res.json(updatedDish);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
