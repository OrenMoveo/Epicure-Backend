import { Request, Response } from "express";
import chefService from "../services/chefService";

export const getAllChefs = async (req: Request, res: Response) => {
  try {
    const chefs = await chefService.getAll();
    if (!chefs) {
      return res.status(404).json({ error: "Chefs not found" });
    }
    res.json(chefs);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const getNewChefs = async (req: Request, res: Response) => {
  try {
    const filterQuery = { newChef: true };
    const newChefs = await chefService.getAll(filterQuery);
    if (!newChefs) {
      return res.status(404).json({ error: "Chefs not found" });
    }
    res.json(newChefs);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const getMostViewedChefs = async (req: Request, res: Response) => {
  try {
    const filterQuery = { mostViewed: true };
    const mostViewedChefs = await chefService.getAll(filterQuery);
    if (!mostViewedChefs) {
      return res.status(404).json({ error: "Chefs not found" });
    }
    res.json(mostViewedChefs);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const getChefOfTheWeek = async (req: Request, res: Response) => {
  try {
    const chefOfTheWeek = await chefService.getChefOfTheWeek();
    if (!chefOfTheWeek) {
      return res.status(404).json({ error: "Chef Of The Week not found" });
    }
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
    if (!newChef) {
      return res
        .status(400)
        .json({ error: "Bad Request, Chef was not created successfully" });
    }
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
    if (!updatedChef) {
      return res
        .status(400)
        .json({ error: "Bad Request, Chef was not updated successfully" });
    }
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
    if (!removedChef) {
      return res.status(404).json({ error: "Chef to remove not found" });
    }
    res.json(removedChef);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
