const Client = require('pg').Client;
const connectionString = new Client({
    user: "postgres",
    password: "91584072",
    host: "localhost",
    port: 5432,
    database: "Movie_API"
})

module.exports = connectionString;