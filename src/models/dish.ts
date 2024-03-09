import mongoose, { Schema, Document } from "mongoose";
import { IRestaurant } from "./restaurant";

export interface IDish extends Document {
  name: string;
  pictureUrl: string;
  description: string[];
  price: number;
  signatureDish: boolean;
  foodIcon: string;
  mealType: string[];
  restaurant: IRestaurant;
}

const DishSchema = new Schema<IDish>({
  name: { type: String, required: true },
  pictureUrl: { type: String, required: true },
  description: { type: [String], required: true },
  price: { type: Number, required: true },
  signatureDish: { type: Boolean, required: true },
  foodIcon: { type: String, required: true },
  mealType: { type: [String], required: true },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

const Dish = mongoose.model<IDish>("Dish", DishSchema);
export default Dish;
