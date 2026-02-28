import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("order", (table) => {
        table.text("code").notNullable().unique();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("order", (table) => {
        table.dropColumn("code");
    });
}

