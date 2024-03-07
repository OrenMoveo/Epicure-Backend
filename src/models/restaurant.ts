import mongoose, { Schema, Document } from "mongoose";
import { IChef } from "./chef";
import { IDish } from "./dish";

export interface IRestaurant extends Document {
  name: string;
  chef: IChef;
  pictureUrl: string;
  rating: number;
  mostPopular: boolean;
  newRestaurant: boolean;
  restaurantDishes: IDish[];
  priceRange: number[];
  isPopular: boolean;
  openingHours: {
    openTime: string;
    closeTime: string;
  };
}

const RestaurantSchema: Schema = new Schema({
  name: { type: String, required: true },
  chef: { type: Schema.Types.ObjectId, ref: "Chef", required: true },
  pictureUrl: { type: String, required: true },
  rating: { type: Number, required: true },
  mostPopular: { type: Boolean, required: true },
  newRestaurant: { type: Boolean, required: true },
  restaurantDishes: [{ type: Schema.Types.ObjectId, ref: "Dish" }],
  priceRange: { type: [Number], required: true },
  isPopular: { type: Boolean, required: true },
  openingHours: {
    openTime: { type: String, required: true },
    closeTime: { type: String, required: true },
  },
});

const Restaurant = mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);

export default Restaurant;
