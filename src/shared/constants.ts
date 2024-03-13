import Joi from "joi";
import Chef from "../models/chef";
import Dish from "../models/dish";
import Restaurant from "../models/restaurant";

export const appRoutes = {
  base: "/",
  restaurants: {
    base: "/restaurants",
    allRestaurants: "/:page",
    restaurantById: "/restaurant/:id",
    popularRestaurants: "/popular-restaurants-data/:page",
    addRestaurant: "/add",
    updateRestaurantById: "/update/:id",
    removeRestaurantById: "/remove/:id",
    openNowRestaurants: "/open-now/:page",
    newRestaurants: "/new/:page",
  },
  chefs: {
    base: "/chefs",
    allChefs: "/:page",
    chefOfTheWeek: "/chef-of-the-week-data",
    addChef: "/add",
    updateChefById: "/update/:id",
    removeChefById: "/remove/:id",
    newChefs: "/new/:page",
    mostViewedChefs: "/most-viewed/:page",
  },
  dishes: {
    base: "/dishes",
    signatureDishes: "/signature-dishes-data",
    addDish: "/add",
    updateDishById: "/update/:id",
    removeDishById: "/remove/:id",
  },
  user: {
    base: "/user",
    signUp: "/sign-up",
    login: "/login",
    removeUserById: "/remove/:id",
  },
  protected: {
    base: "/protected",
  },
  search: {
    base: "/search",
    all: "/",
  },
};

export const populatedOptions = {
  restaurants: {
    withChef: [{ path: "chef", select: "name", model: Chef }],
    byId: [
      {
        path: "restaurantDishes",
        model: Dish,
        populate: {
          path: "restaurant",
          model: Restaurant,
          select: "name",
        },
      },
      { path: "chef", model: Chef },
    ],
  },
  chefs: {
    withRestaurants: [
      {
        path: "restaurants",
        model: Restaurant,
        select: "name pictureUrl",
      },
    ],
  },
  dishes: {
    withRestaurant: [{ path: "restaurant", model: Restaurant, select: "name" }],
  },
};

export const objectIdSchema = Joi.string()
  .pattern(new RegExp("^[0-9a-fA-F]{24}$"))
  .message("Invalid ObjectId");
