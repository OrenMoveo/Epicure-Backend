import Restaurant, { IRestaurant } from "../models/restaurant";
import Chef from "../models/chef";
import Dish from "../models/dish";
import { BaseService } from "./baseService";
import { updateRestaurant } from "../controllers/restaurantController";

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

  async addRestaurant(
    newRestaurantData: Partial<IRestaurant>
  ) {
    const savedRestaurant = await this.create(newRestaurantData);
    await Chef.findByIdAndUpdate(
      savedRestaurant.chef,
      { $push: { restaurants: savedRestaurant._id } },
      { new: true, useFindAndModify: false }
    );
    return savedRestaurant;
  }

  async updateRestaurant(
    updateData: Partial<IRestaurant>
  ){
    return await this.update(updateData._id,updateData);
  }
}

export default new RestaurantService();
