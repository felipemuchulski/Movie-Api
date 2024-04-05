const { Router } = require("express");
const MovieNotesController = require("../controllers/MovienotesController");

const moviesRoutes = Router();
const movieNotesController = new MovieNotesController();

moviesRoutes.post("/", movieNotesController.create);
moviesRoutes.get("/:id_movies", movieNotesController.show);

module.exports = moviesRoutes;

