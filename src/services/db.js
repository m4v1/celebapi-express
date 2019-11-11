import { Model } from 'objection';
import Knex from 'knex';
import Profile from '../models/profile';
import logger from './logger';

// Initialize knex.
export const knex = Knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }
});

// Give the knex instance to objection.
Model.knex(knex);

class Database {
  findByName = async name => {
    try {
      const result = await Profile.query()
        .skipUndefined()
        .findOne({
          name
        });
      return result;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  };

  insertProfile = async data => {
    try {
      const { name, bday, bplace, bio } = data;
      await Profile.query().insert({
        name,
        bday,
        bplace,
        bio
      });
    } catch (error) {
      logger.error(error);
    }
  };
}

export default new Database();
