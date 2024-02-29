import { Request, Response } from "express";
import Chef from "../models/chef";
import Restaurant from "../models/restaurant";

export const getAllChefs = async (req: Request, res: Response) => {
  try {
    const chefs = await Chef.find();
    if (!chefs || chefs.length === 0) {
      return res.status(404).json({ msg: "Chefs not found" });
    }
    res.json(chefs);
  } catch (error: any) {
    console.log("all Chefs fail", error.message);
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const getChefOfTheWeek = async (req: Request, res: Response) => {
  try {
    const chefOfTheWeek = await Chef.findOne({ chefOfTheWeek: true }).populate({
      path: "restaurants",
      model: Restaurant,
      select: "name pictureUrl",
    });
    if (!chefOfTheWeek) {
      return res.status(404).json({ msg: "Chef of the Week not found" });
    }

    res.json(chefOfTheWeek);
  } catch (error: any) {
    console.log("chef of the week fail- backend", error.message);
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
