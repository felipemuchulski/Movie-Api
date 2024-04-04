const knex = require("knex");
const connectionString = require("../database/postgresql/connect_database");
const AppError = require("../utils/AppError");

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating } = request.body;
    const { user_id } = request.params;

    try {
      const checkMovieExist = await connectionString.query(
        "SELECT * FROM movie_notes WHERE title_movie = $1",
        [title]
      );

      if (checkMovieExist.rows.length > 0) {
        throw new AppError("Filme ja cadastrado");
      }

      await connectionString.query(
        "INSERT INTO movie_notes (title_movie, description, rating, user_id) VALUES ($1, $2, $3, $4)",
        [title, description, rating, user_id]
      );

      response.status(201).json("Filme_Nota criado com sucesso");
    } catch (error) {
      console.log(error);
      response.status(error.statusCode || 400).json({ error: error.message });
    }
  }
}

module.exports = MovieNotesController;
