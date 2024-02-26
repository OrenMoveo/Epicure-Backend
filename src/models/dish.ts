import mongoose, { Schema, Document } from "mongoose";
import { Restaurant } from "./restaurant";

export interface Dish extends Document {
  name: string;
  pictureUrl: string;
  description: string[];
  price: number;
  signatureDish: boolean;
  foodIcon: string;
  mealType: string;
  restaurant: Restaurant;
}

const DishSchema = new Schema<Dish>({
  name: { type: String, required: true },
  pictureUrl: { type: String, required: true },
  description: { type: [String], required: true },
  price: { type: Number, required: true },
  signatureDish: { type: Boolean, required: true },
  foodIcon: { type: String, required: true },
  mealType: { type: String, required: true },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

export const DishModel = mongoose.model<Dish>("Dish", DishSchema);
