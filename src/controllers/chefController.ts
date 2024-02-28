import { Request, Response } from "express";
import Chef from "../models/chef";
import Restaurant from "../models/restaurant";

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
