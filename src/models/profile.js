import { Model } from 'objection';
import moment from 'moment';

class Profile extends Model {
  static get tableName() {
    return 'profiles';
  }

  $parseDatabaseJson(json) {
    const data = super.$parseDatabaseJson(json);
    data.bday = data.bday && moment(data.bday).format('Y-MM-DD');
    return data;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'bday', 'bplace', 'bio'],
      properties: {
        name: { type: 'string', minLength: 1, maxLength: 150 },
        bday: { type: 'date' },
        bplace: { type: 'string', minLength: 1, maxLength: 150 },
        bio: { type: 'string' }
      }
    };
  }
}

export default Profile;
