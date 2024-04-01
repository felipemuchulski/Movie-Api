const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const connectionString = require("../database/postgresql/connect_database");

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;

    try {
      const checkUserExists = await connectionString.query(
        "SELECT * FROM users WHERE email_users = $1",
        [email]
      );
      if (checkUserExists.rows.length > 0) {
        throw new AppError("E-mail ja cadastrado", 400);
      }

      const hashedPassword = await hash(password, 8);
      await connectionString.query(
        "INSERT INTO users (name_users, password_users, email_users) VALEUS ($1, $2, $3)",
        [name, password, email]
      );
      response.status(201).json("Usuario cadastrado com sucesso");
    } catch (error) {
      console.log(error);
      response.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    try {
      const user = await connectionString.query(
        "SELECT * FROM users WHERE id_users = $1",
        [id]
      );
      if (user.rows.length === 0) {
        throw new AppError("Usuario nao encontrado");
      }

      const userWithUpdatedEmail = await connectionString.query(
        "SELECT * FROM users WHERE email_user = $1",
        [email]
      );
      if (
        userWithUpdatedEmail.rows.length > 0 &&
        userWithUpdatedEmail.rows[0].id_users != user.rows[0].id_users
      ) {
        throw new AppError("Este e-mail ja esta em uso");
      }

      if (password && old_password) {
        const checkOldPassword = await connectionString
          .query("SELECT * FROM users WHERE password_user = $1", [password])
          .then(compare(old_password, password));

        if (!checkOldPassword) {
          throw new AppError("Senha antiga nao confere");
        }

        user.password = await hash(password, 8);
        console.log(password);
      }

      await connectionString.query(
        `
          UPDATE users SET
          name_user = $1,
          email_user = $2,
          password_user = $3,
          update_at = NOW()
          WHERE id_users = $4`,
        [user.rows[0].name_user, user.rows[0].email_user, user.password_user, id]
      );
    } catch (error) {}
  }
}
