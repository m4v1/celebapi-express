import {
  Model,
} from 'objection';
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
}

export default Profile;
