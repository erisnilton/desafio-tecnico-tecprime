import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {

  await knex.schema.createTable('order', (table) => {
    table.uuid('id').primary();
    table.uuid('user_id').notNullable().references('user.id');
    table.text('address').notNullable();
    table
      .enum('payment_method', ['PIX', 'CREDIT_CARD', 'TICKET'])
      .notNullable()
      .defaultTo('TICKET');
    table
      .enum('status', ['PENDING', 'COMPLETED', 'CANCELLED'])
      .notNullable()
      .defaultTo('PENDING');
    table.text('email').notNullable();
    table.text('name').notNullable();
    table.decimal('total', 10, 2).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('order_items', (table) => {
    table.uuid('id').primary();
    table
      .uuid('order_id')
      .notNullable()
      .references('order.id')
      .onDelete('CASCADE');
    table.text('external_product_id').notNullable();
    table.integer('quantity').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
  
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('order_items');
  await knex.schema.dropTable('order');
}
