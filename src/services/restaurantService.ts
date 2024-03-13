import Restaurant, { IRestaurant } from "../models/restaurant";
import Chef from "../models/chef";
import Dish from "../models/dish";
import { BaseService } from "./baseService";
import dishService from "./dishService";
import { populatedOptions } from "../shared/constants";

class RestaurantService extends BaseService<IRestaurant> {
  constructor() {
    super(Restaurant);
  }

  async getRestaurantById(id: string): Promise<IRestaurant | null> {
    return await this.getById(id, populatedOptions.restaurants.byId);
  }

  async addRestaurant(
    newRestaurantData: Partial<IRestaurant>
  ): Promise<IRestaurant> {
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
  ): Promise<IRestaurant | null> {
    return await this.update(restaurantId, updateData);
  }

  async removeRestaurantById(
    restaurantId: string
  ): Promise<IRestaurant | null> {
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
