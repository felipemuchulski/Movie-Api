const knex = require("knex");
const connectionString = require("../database/postgresql/connect_database");
const AppError = require("../utils/AppError");

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating, id_user } = request.body;
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
        [title, description, rating, id_user]
      );

      response.status(201).json("Filme_Nota criado com sucesso");
    } catch (error) {
      console.log(error);
      response.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  async show(request, response){
    const { id_movies } = request.params

    try {
      const movieNote =  await connectionString.query("SELECT * FROM movie_notes WHERE id_movies = $1 LIMIT 1", [id_movies]);

      
      const movieDescription = await connectionString.query("SELECT description FROM movie_notes WHERE id_movies = $1", [id_movies]);
     
      
      if (
        movieNote.rows.length > 0 &&
         movieDescription.rows.length > 0 
      ) {
        const movie = movieNote.rows[0];
        const description = movieDescription.rows[0]
        
        return response.json({
         ... movie,
          description
        });
      } else {
        return response.status(404).json({ AppError: `nota nao encontrada` });
        
      }


    } catch (error) {
      console.error("Erro ao buscar a nota:", error);
      return response.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async index(request, response){
    const {title, user_id, tags } = request.params
  }
}

module.exports = MovieNotesController;
