import mongoose, { Schema, Document } from "mongoose";
import { IChef } from "./chef";
import { Dish } from "./dish";

export interface IRestaurant extends Document {
  name: string;
  chef: IChef;
  pictureUrl: string;
  openNow: boolean;
  rating: number;
  mostPopular: boolean;
  newRestaurant: boolean;
  restaurantDishes: Dish[];
  priceRange: number[];
  isPopular: boolean;
}

const RestaurantSchema = new Schema<IRestaurant>({
  name: { type: String, required: true },
  chef: { type: Schema.Types.ObjectId, ref: "Chef", required: true },
  pictureUrl: { type: String, required: true },
  openNow: { type: Boolean, required: true },
  rating: { type: Number, required: true },
  mostPopular: { type: Boolean, required: true },
  newRestaurant: { type: Boolean, required: true },
  restaurantDishes: [{ type: Schema.Types.ObjectId, ref: "Dish" }],
  priceRange: { type: [Number], required: true },
  isPopular: { type: Boolean, required: true },
});

const Restaurant = mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);

export default Restaurant;
