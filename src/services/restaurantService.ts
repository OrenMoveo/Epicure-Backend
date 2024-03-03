import Restaurant, { IRestaurant } from "../models/restaurant";
import Chef from "../models/chef";
import Dish from "../models/dish";
import { BaseService } from "./baseService";

class RestaurantService extends BaseService<IRestaurant> {
  constructor() {
    super(Restaurant);
  }

  async getAllRestaurants() {
    return await this.model.find().populate("chef", "name", Chef);
  }

  async getPopularRestaurants() {
    return await this.model
      .find({ isPopular: true })
      .populate("chef", "name", Chef);
  }

  async getRestaurantById(id: string) {
    return await this.model
      .findById(id)
      .populate({
        path: "restaurantDishes",
        model: Dish,
        populate: {
          path: "restaurant",
          model: Restaurant,
          select: "name",
        },
      })
      .populate({ path: "chef", model: Chef });
  }
}

export default new RestaurantService();
