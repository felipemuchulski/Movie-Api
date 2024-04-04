const { Router } = require("express");
const MovieNotesController = require("../controllers/MovienotesController");

const moviesRoutes = Router();
const movieNotesController = new MovieNotesController();

moviesRoutes.post("/", movieNotesController.create);

module.exports = moviesRoutes;

