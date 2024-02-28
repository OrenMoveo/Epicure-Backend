import mongoose, { Schema, Document } from "mongoose";
import { IRestaurant } from "./restaurant";

export interface IChef extends Document {
  name: string;
  pictureUrl: string;
  restaurants: IRestaurant[];
  newChef: boolean;
  views: number;
  mostViewed: boolean;
  chefOfTheWeek: boolean;
  description: string;
}

const ChefSchema: Schema = new Schema({
  name: { type: String, required: true },
  pictureUrl: { type: String, required: true },
  restaurants: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }],
  newChef: { type: Boolean, required: true },
  views: { type: Number, required: true },
  mostViewed: { type: Boolean, required: true },
  chefOfTheWeek: { type: Boolean, required: true, unique: true },
  description: { type: String, required: true },
});

const Chef = mongoose.model<IChef>("Chef", ChefSchema);

export default Chef;
