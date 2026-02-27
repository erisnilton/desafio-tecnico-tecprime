import { Knex } from 'knex';
import { v7 as uuidv7 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  await knex('user').insert([
    {
      id: uuidv7(),
      full_name: 'Admin',
      password: '$2a$10$p7x4E3YsObJpYLcGJGuP1.Uge5PbP4VIR.buroNLae9n2Sev6sm5m', // admin
      username: 'admin',
      picture_url: 'https://i.pravatar.cc/150?img=12',
      created_at: knex.fn.now(),
    },
  ]);
}
