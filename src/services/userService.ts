import User, { IUser } from "../models/user";
import { BaseService } from "./baseService";

class UserService extends BaseService<IUser> {
  constructor() {
    super(User);
  }
}

export default new UserService();
