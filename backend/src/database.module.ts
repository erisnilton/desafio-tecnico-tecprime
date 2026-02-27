import { Global, Inject, Module, OnModuleInit } from '@nestjs/common';
import knex, { Knex } from 'knex';
import Objection, { Model } from 'objection';
import knexfile from '../knexfile';

const KNEX_TOKEN = Symbol('knex');

export function InjectKnex() {
  return Inject(KNEX_TOKEN);
}
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: KNEX_TOKEN,
      useFactory() {
        return knex(knexfile);
      },
    },
  ],
  exports: [KNEX_TOKEN],
})
export class DatabaseModule implements OnModuleInit {
  constructor(@InjectKnex() readonly knex: Knex) {}
  async onModuleInit() {
    Model.knex(this.knex);
  }
}
