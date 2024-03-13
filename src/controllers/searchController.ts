import { Request, Response } from "express";
import chefService from "../services/chefService";
import restaurantService from "../services/restaurantService";
import dishService from "../services/dishService";
import { populatedOptions } from "../shared/constants";

const searchController = {
  searchQuery: async (req: Request, res: Response) => {
    try {
      const searchTerm = req.query.searchTerm;

      const chefResults = await chefService.getAll({
        name: { $regex: searchTerm, $options: "i" },
      });
      const restaurantResults = await restaurantService.getAll(
        {
          name: { $regex: searchTerm, $options: "i" },
        },
        populatedOptions.restaurants.withChef
      );
      const dishResults = await dishService.getAll(
        {
          name: { $regex: searchTerm, $options: "i" },
        },
        populatedOptions.dishes.withRestaurant
      );

      const searchResultsObject = {
        chefs: chefResults,
        restaurants: restaurantResults,
        dishes: dishResults,
      };

      res.json(searchResultsObject);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default searchController;
