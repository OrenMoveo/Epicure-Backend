import { Model, Document } from "mongoose";

export class BaseService<T extends Document> {
  constructor(protected model: Model<T>) {}

  async getAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async getById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
