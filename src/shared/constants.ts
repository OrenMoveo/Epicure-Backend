import Joi from "joi";

export const appRoutes = {
  base: "/",
  restaurants: {
    base: "/restaurants",
    allRestaurants: "/",
    restaurantById: "/:id",
    popularRestaurants: "/popular-restaurants-data",
    addRestaurant: "/add",
    updateRestaurantById: "/update/:id",
    removeRestaurantById: "/remove/:id",
  },
  chefs: {
    base: "/chefs",
    allChefs: "/",
    chefOfTheWeek: "/chef-of-the-week-data",
    addChef: "/add",
    updateChefById: "/update/:id",
    removeChefById: "/remove/:id",
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
};

export const objectIdSchema = Joi.string()
  .pattern(new RegExp("^[0-9a-fA-F]{24}$"))
  .message("Invalid ObjectId");
