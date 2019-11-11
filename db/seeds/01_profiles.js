/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
const faker = require('faker');

exports.seed = function(knex) {
  const createProfile = () => {
    return {
      name: faker.name.findName(),
      bday: faker.date.past(),
      bplace: faker.address.country(),
      bio: faker.lorem.text(faker.random.number(150))
    };
  };

  // limit is the number of fake profiles to insert
  const limit = 10;
  const profiles = [];

  // setting a seed to have consistent results
  faker.seed(15646525);

  for (let index = 0; index < limit; index += 1) {
    profiles.push(createProfile());
  }

  return knex('profiles')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('profiles').insert(profiles);
    });
};
