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

    table.integer("user_id").references("id_user").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
} );


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('movie_notes');