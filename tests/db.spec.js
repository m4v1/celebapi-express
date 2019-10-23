import {} from 'dotenv/config';
import Database from '../src/services/db';

describe('Database service', () => {
  test('it should return a profile from db', async () => {
    const profile = await Database.findByName('anita herbert');
    expect(profile.name).toBeTruthy();
    expect(profile.bday).toBeTruthy();
    expect(profile.bplace).toBeTruthy();
    expect(profile.bio).toBeTruthy();
  });
});
