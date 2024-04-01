const knex = require("knex");
const { table } = require("..");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("movie_tags", (table) => {
    table.increments("movie_tag_id");
    
    table.integer("user_id").references("id_users").inTable("users");
    table.integer("movies_id").references("id_movies").inTable("movie_notes");
    table.text("name_tag").notNullable();
})
  
;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("movie_tags");
