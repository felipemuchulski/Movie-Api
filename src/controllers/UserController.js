const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const connectionString = require("../database/postgresql/connect_database");

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;

    try {
      const checkUserExists = await connectionString.query(
        "SELECT * FROM users WHERE email_user = $1",
        [email]
      );
      if (checkUserExists.rows.length > 0) {
        throw new AppError("E-mail ja cadastrado", 400);
      }

      const hashedPassword = await hash(password, 8);
      
      await connectionString.query(
        "INSERT INTO users (name_user, password_user, email_user) VALUES ($1, $2, $3)",
        [name, hashedPassword, email]
      );
      response.status(201).json("Usuario cadastrado com sucesso");
    } catch (error) {
      console.log(error);
      response.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;
  
    try {
      const user = await connectionString.query(
        "SELECT * FROM users WHERE id_user = $1",
        [id]
      );
      if (user.rows.length === 0) {
        throw new AppError("Usuário não encontrado");
      }
  
      const userToUpdate = user.rows[0];
  
      if (email !== userToUpdate.email_user) {
        const userWithUpdatedEmail = await connectionString.query(
          "SELECT * FROM users WHERE email_user = $1",
          [email]
        );
        if (userWithUpdatedEmail.rows.length > 0) {
          throw new AppError("Este e-mail já está em uso");
        }
      }
  
      if (password && old_password) {
        const isPasswordCorrect = await compare(old_password, userToUpdate.password_user);
  
        if (!isPasswordCorrect) {
          throw new AppError("Senha antiga não confere");
        }
  
        const hashedPassword = await hash(password, 8);
        userToUpdate.password_user = hashedPassword;
      }
  
      await connectionString.query(
        `
          UPDATE users SET
          name_user = $1,
          email_user = $2,
          password_user = $3,
          update_at = NOW()
          WHERE id_user = $4
        `,
        [name || userToUpdate.name_user, email || userToUpdate.email_user, userToUpdate.password_user, id]
      );
  
      return response.status(200).json("Usuário atualizado com sucesso");
    } catch (error) {
      console.error(error);
      response.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
