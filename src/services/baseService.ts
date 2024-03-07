import { Model, Document, PopulateOptions, FilterQuery } from "mongoose";

export class BaseService<T extends Document> {
  constructor(protected model: Model<T>) {}

  async getAll(
    filterQuery = {},
    populateOptions?: PopulateOptions[]
  ): Promise<T[]> {
    const query = this.model.find(filterQuery);
    if (populateOptions) {
      query.populate(populateOptions);
    }
    return query;
  }

  async getAllPagination(
    filterQuery = {},
    page: number,
    populateOptions?: PopulateOptions[]
  ): Promise<T[]> {

    const skip = (page - 1) * 10;
    const query = this.model.find(filterQuery).skip(skip).limit(10);
    if (populateOptions) {
      query.populate(populateOptions);
    }
    return query;
  }

  async getById(
    id: string,
    populateOptions?: PopulateOptions[]
  ): Promise<T | null> {
    const query = this.model.findById(id);
    if (populateOptions) {
      query.populate(populateOptions);
    }
    return query;
  }

  async getOne(
    filterBy?: {},
    populateOptions?: PopulateOptions[]
  ): Promise<T | null> {
    const query = this.model.findOne(filterBy);
    if (populateOptions) {
      query.populate(populateOptions);
    }
    return query;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }
}
