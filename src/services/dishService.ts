import Dish, { IDish } from "../models/dish";
import Restaurant from "../models/restaurant";
import { BaseService } from "./baseService";

class DishService extends BaseService<IDish> {
  constructor() {
    super(Dish);
  }

  async getSignatureDishes() {
    const populateOptions = [
      { path: "restaurant", model: Restaurant, select: "name" },
    ];
    const allDishes = await this.getAll(populateOptions);
    const signatureDishes = allDishes.filter((dish) => dish.signatureDish);
    return signatureDishes;
  }

  async addDish(data: Partial<IDish>) {
    const savedDish = await this.create(data);
    await Restaurant.findByIdAndUpdate(
      savedDish.restaurant,
      { $push: { restaurantDishes: savedDish._id } },
      { new: true, useFindAndModify: false }
    );
    return savedDish;
  }
}

export default new DishService();
