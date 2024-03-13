import express from "express";
import searchController from "../controllers/searchController";
import { appRoutes } from "../shared/constants";

const searchRouter = express.Router();

searchRouter.get("/", searchController.searchQuery);

export default searchRouter;
