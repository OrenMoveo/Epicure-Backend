import mongoose, { Schema, Document } from "mongoose";
import { Restaurant } from "./restaurant";

export interface Chef extends Document {
  name: string;
  pictureUrl: string;
  restaurants: Restaurant[];
  newChef: boolean;
  views: number;
  mostViewed: boolean;
  description: string;
}

const ChefSchema = new Schema<Chef>({
  name: { type: String, required: true },
  pictureUrl: { type: String, required: true },
  restaurants: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }],
  newChef: { type: Boolean, required: true },
  views: { type: Number, required: true },
  mostViewed: { type: Boolean, required: true },
  description: { type: String, required: true },
});

export const ChefModel = mongoose.model<Chef>("Chef", ChefSchema);
