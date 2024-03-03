import Restaurant, { IRestaurant } from "../models/restaurant";
import Chef from "../models/chef";
import Dish from "../models/dish";
import { BaseService } from "./baseService";
import {
  updateRestaurantById,
  removeRestaurantById,
} from "../controllers/restaurantController";
import dishService from "./dishService";

class RestaurantService extends BaseService<IRestaurant> {
  constructor() {
    super(Restaurant);
  }

  async getAllRestaurants() {
    const populateOptions = [{ path: "chef", select: "name", model: Chef }];
    return await this.getAll(populateOptions);
  }

  async getPopularRestaurants() {
    const populateOptions = [{ path: "chef", select: "name", model: Chef }];
    const allRestaurants = await this.getAll(populateOptions);
    const popularRestaurants = allRestaurants.filter(
      (restaurant) => restaurant.isPopular
    );

    return popularRestaurants;
  }

  async getRestaurantById(id: string) {
    const populatedOptions = [
      {
        path: "restaurantDishes",
        model: Dish,
        populate: {
          path: "restaurant",
          model: Restaurant,
          select: "name",
        },
      },
      { path: "chef", model: Chef },
    ];

    return await this.getById(id, populatedOptions);
  }

  async addRestaurant(newRestaurantData: Partial<IRestaurant>) {
    const savedRestaurant = await this.create(newRestaurantData);
    await Chef.findByIdAndUpdate(
      savedRestaurant.chef,
      { $push: { restaurants: savedRestaurant._id } },
      { new: true, useFindAndModify: false }
    );
    return savedRestaurant;
  }

  async updateRestaurantById(
    restaurantId: string,
    updateData: Partial<IRestaurant>
  ) {
    return await this.update(restaurantId, updateData);
  }

  async removeRestaurantById(restaurantId: string) {
    const removedRestaurant = await this.remove(restaurantId);
    if (removedRestaurant) {
      for (const dish of removedRestaurant.restaurantDishes) {
        await dishService.removeDishById(dish._id);
      }
    }
    await Chef.findByIdAndUpdate(
      removedRestaurant?.chef,
      { $pull: { restaurants: removedRestaurant?._id } },
      { new: true, useFindAndModify: false }
    );
    return removedRestaurant;
  }
}

export default new RestaurantService();
