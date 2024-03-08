const connectionString = require("../postgresql/connect_database");

async function pgConnection() {
    try {
        await connectionString.connect();
        console.log("Conexão com o PostgreSQL estabelecida com sucesso");
        return connectionString;
    } catch (error) {
        console.error("Erro ao conectar com o PosgreSQL", error);
        throw error;
    };
};

module.exports = pgConnection;

