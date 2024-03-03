import { Request, Response } from "express";
import chefService from "../services/chefService";

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
