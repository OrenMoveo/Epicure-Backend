import Chef, { IChef } from "../models/chef";
import Restaurant from "../models/restaurant";
import { BaseService } from "./baseService";

class ChefService extends BaseService<IChef> {
  constructor() {
    super(Chef);
  }

  async getAllChefs() {
    return await this.getAll();
  }

  async getChefOfTheWeek() {
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
}

export default new ChefService();
