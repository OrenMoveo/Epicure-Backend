import fs from "fs";
import mongoose from "mongoose";
import { Chef, ChefModel } from "../models/chef";
import { Restaurant, RestaurantModel } from "../models/restaurant";
import { Dish, DishModel } from "../models/dish";

export const insertChefs = async (chefsData: Chef[]) => {
  return await ChefModel.insertMany(chefsData);
};

export const insertRestaurants = async (restaurantsData: Restaurant[]) => {
  return await RestaurantModel.insertMany(restaurantsData);
};

export const insertDishes = async (dishesData: Dish[]) => {
  const insertedRestaurants = await RestaurantModel.find();

  return await DishModel.insertMany(
    dishesData.map((dishData: any) => {
      const restaurantId = insertedRestaurants.find(
        (restaurant) => restaurant.name === dishData.restaurant
      )?._id;

      return {
        ...dishData,
        restaurant: restaurantId,
      };
    })
  );
};

export const updateChefRestaurantList = async (
  chefs: Chef[],
  restaurants: Restaurant[]
) => {
  await Promise.all(
    restaurants.map(async (restaurant) => {
      const chef = chefs.find((c) => c._id.equals(restaurant.chef));

      if (chef) {
        chef.restaurants.push(restaurant._id);
        await chef.save();

        restaurant.restaurantDishes = await DishModel.find({
          restaurant: restaurant._id,
        }).select("_id");

        await restaurant.save();
      }
    })
  );
};

export const insertData = async () => {
  const jsonData = JSON.parse(fs.readFileSync("./src/data/data.json", "utf-8"));

  try {
    // Insert chefs
    const insertedChefs = await insertChefs(jsonData.data.chefs);

    // Insert restaurants
    const restaurants = jsonData.data.restaurants.map((restaurantData: any) => {
      const chefId = insertedChefs.find(
        (chef) => chef.name === restaurantData.chef
      )?._id;

      return {
        ...restaurantData,
        chef: chefId,
        restaurantDishes: [],
      };
    });
    const insertedRestaurants = await insertRestaurants(restaurants);

    // Insert dishes
    const insertedDishes = await insertDishes(jsonData.data.dishes);

    // Update restaurantDishes field in restaurants
    await updateChefRestaurantList(insertedChefs, insertedRestaurants);

    console.log("Data inserted successfully");
  } catch (error: any) {
    console.error("Error inserting data:", error.message);
  } finally {
    // Close the connection after inserting data
    mongoose.connection.close();
  }
};

// Comment out the immediate invocation if you want to export it and call it separately
// insertData();
