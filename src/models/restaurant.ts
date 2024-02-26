import mongoose, { Schema, Document } from "mongoose";
import { Chef } from "./chef";
import { Dish } from "./dish";

export interface Restaurant extends Document {
  name: string;
  chef: Chef;
  pictureUrl: string;
  openNow: boolean;
  location: string;
  rating: number;
  mostPopular: boolean;
  newRestaurant: boolean;
  restaurantDishes: Dish[];
  priceRange: number[];
}

const RestaurantSchema = new Schema<Restaurant>({
  name: { type: String, required: true },
  chef: { type: Schema.Types.ObjectId, ref: "Chef", required: true },
  pictureUrl: { type: String, required: true },
  openNow: { type: Boolean, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  mostPopular: { type: Boolean, required: true },
  newRestaurant: { type: Boolean, required: true },
  restaurantDishes: [{ type: Schema.Types.ObjectId, ref: "Dish" }],
  priceRange: { type: [Number], required: true },
});

export const RestaurantModel = mongoose.model<Restaurant>(
  "Restaurant",
  RestaurantSchema
);
