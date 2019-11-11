import dotenv from 'dotenv';
import path from 'path';

export class Config {
  static load() {
    switch (process.env.NODE_ENV) {
      case 'testing':
        dotenv.config({ path: path.join(__dirname, '../.env.test') });
        break;
      default:
        dotenv.config({ path: path.join(__dirname, '../.env') });
        break;
    }
  }
}

export default Config.load();
