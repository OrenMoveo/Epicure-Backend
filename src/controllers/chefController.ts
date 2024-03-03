import { Request, Response } from "express";
import chefService from "../services/chefService";
import restaurantService from "../services/restaurantService";

export const getAllChefs = async (req: Request, res: Response) => {
  try {
    const chefs = await chefService.getAll();
    res.json(chefs);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const getChefOfTheWeek = async (req: Request, res: Response) => {
  try {
    const chefOfTheWeek = await chefService.getChefOfTheWeek();
    res.json(chefOfTheWeek);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const addChef = async (req: Request, res: Response) => {
  try {
    const newChefData = req.body;
    const newChef = await chefService.addChef(newChefData);
    res.json(newChef);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const updateChefById = async (req: Request, res: Response) => {
  try {
    const ChefId = req.params.id;
    const updateData = req.body;
    const updatedChef = await chefService.updateChefById(ChefId, updateData);
    res.json(updatedChef);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const removeChefById = async (req: Request, res: Response) => {
  try {
    const ChefId = req.params.id;
    const removedChef = await chefService.removeChefById(ChefId);
    res.json(removedChef);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
