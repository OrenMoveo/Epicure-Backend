import Chef, { IChef } from "../models/chef";
import { BaseService } from "./baseService";
import restaurantService from "./restaurantService";
import { populatedOptions } from "../shared/constants";

class ChefService extends BaseService<IChef> {
  constructor() {
    super(Chef);
  }

  async getAllChefs(): Promise<IChef[]> {
    return await this.getAll();
  }

  async getChefOfTheWeek(): Promise<IChef | null> {
    return await this.getOne(
      { chefOfTheWeek: true },
      populatedOptions.chefs.withRestaurants
    );
  }

  async addChef(data: Partial<IChef>): Promise<IChef> {
    return await this.create(data);
  }

  async updateChefById(
    chefId: string,
    updateData: Partial<IChef>
  ): Promise<IChef | null> {
    return await this.update(chefId, updateData);
  }

  async removeChefById(chefId: string): Promise<IChef | null> {
    const removedChef = await this.remove(chefId);
    if (removedChef) {
      for (const restaurant of removedChef.restaurants) {
        await restaurantService.removeRestaurantById(restaurant._id);
      }
    }
    return removedChef;
  }
}

export default new ChefService();
