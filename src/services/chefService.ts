import Chef, { IChef } from "../models/chef";
import Restaurant from "../models/restaurant";
import { BaseService } from "./baseService";
import { updateChefById, removeChefById } from "../controllers/chefController";
import restaurantService from "./restaurantService";
import { removeRestaurantById } from "../controllers/restaurantController";

class ChefService extends BaseService<IChef> {
  constructor() {
    super(Chef);
  }

  async getAllChefs(): Promise<IChef[]> {
    return await this.getAll();
  }

  async getChefOfTheWeek(): Promise<IChef | null> {
    return await this.getOne({ chefOfTheWeek: true }, [
      {
        path: "restaurants",
        model: Restaurant,
        select: "name pictureUrl",
      },
    ]);
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
