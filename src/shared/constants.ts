export const appRoutes = {
  base: "/",
  restaurants: {
    base: "/restaurants",
    allRestaurants: "/",
    restaurantById: "/:id",
    popularRestaurants: "/popular-restaurants-data",
    addRestaurant: "/add",
    updateRestaurant: "/update/:id",
    removeRestaurant: "/remove/:id",
  },
  chefs: {
    base: "/chefs",
    allChefs: "/",
    chefOfTheWeek: "/chef-of-the-week-data",
    addChef: "/add",
  },
  dishes: {
    base: "/dishes",
    signatureDishes: "/signature-dishes-data",
  },
};
