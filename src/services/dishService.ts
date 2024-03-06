import Dish, { IDish } from "../models/dish";
import Restaurant from "../models/restaurant";
import { BaseService } from "./baseService";
import { updateDishById, removeDishById } from "../controllers/dishController";
import { PopulateOptions } from "mongoose";

class DishService extends BaseService<IDish> {
  constructor() {
    super(Dish);
  }

  async getSignatureDishes(): Promise<IDish[]> {
    const populateOptions: PopulateOptions[] = [
      { path: "restaurant", model: Restaurant, select: "name" },
    ];
    const allDishes = await this.getAll(populateOptions);
    const signatureDishes = allDishes.filter((dish) => dish.signatureDish);
    return signatureDishes;
  }

  async addDish(data: Partial<IDish>): Promise<IDish> {
    const savedDish = await this.create(data);
    await Restaurant.findByIdAndUpdate(
      savedDish.restaurant,
      { $push: { restaurantDishes: savedDish._id } },
      { new: true, useFindAndModify: false }
    );
    return savedDish;
  }

  async updateDishById(
    dishId: string,
    updateData: Partial<IDish>
  ): Promise<IDish | null> {
    return await this.update(dishId, updateData);
  }

  async removeDishById(dishId: string): Promise<IDish | null> {
    const removedDish = await this.remove(dishId);
    await Restaurant.findByIdAndUpdate(
      removedDish?.restaurant,
      { $pull: { restaurantDishes: removedDish?._id } },
      { new: true, useFindAndModify: false }
    );
    return removedDish;
  }
}

export default new DishService();
