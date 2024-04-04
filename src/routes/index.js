const { Router } = require("express");

const usersRoutes = require("./user.routes");
const moviesRoutes = require("./movieNotes.routes")

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/notes", moviesRoutes);

module.exports = routes