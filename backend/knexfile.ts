import { ConfigModule } from '@nestjs/config';
import { Knex } from 'knex';

ConfigModule.forRoot({
  envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
});

export default {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: './migrations',
    extension: 'ts',
  },
  seeds: {
    directory: './seeds',
  },
} as Knex.Config;
