const knex = require("knex");
const { table } = require("..");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up =  (knex) => knex.schema.createTable("movie_notes", table => {
    table.increments("id_movies");
    table.text("title_movie").notNullable();
    table.text("description").notNullable();
    table.integer("rating").notNullable();

    table.integer("user_id").references("")
} );


exports.down = function(knex) {
  
};
