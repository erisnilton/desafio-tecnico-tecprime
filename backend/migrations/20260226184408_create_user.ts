import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user', (table) => {
        table.uuid('id').primary();
        table.string('full_name').notNullable();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
        table.string('picture_url').nullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('user');
}

