/* eslint-disable newline-per-chained-call */
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import moment from 'moment';

import logger from './logger';

const parseBday = ($) => {
  const month = $('.main-stats > div > div').eq(0).find('span.hidden-sm').text();
  $('.hidden-sm').remove();
  $('.hidden-xs').remove();
  const day = $('.main-stats > div > div').eq(0).find('.stat.box a').eq(0).text().trim();
  const year = $('.main-stats > div > div').eq(0).find('.stat.box a').eq(1).text();

  const parsedDate = `${day} ${month} ${year}`;
  const date = moment(parsedDate, 'D MMMM YYYY').format('Y-MM-DD');

  return date;
};

const parseBio = ($) => {
  const bio = $('div.bio p').eq(0).text().trim();

  return bio;
};

const parseBPlace = ($) => {
  const bplace = $('.main-stats > div > div').eq(1).find('a').text().trim();

  return bplace;
};

const searchRemoteInfo = async (name) => {
  const url = `https://www.famousbirthdays.com/people/${name.replace(' ', '-')}.html`;

  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.text();
      const $ = cheerio.load(data);

      const bday = parseBday($);
      const bio = parseBio($);
      const bplace = parseBPlace($);

      const profile = {
        name,
        bday,
        bplace,
        bio,
      };

      return profile;
    }
  } catch (error) {
    logger.error(error);
  }

  return undefined;
};

export default searchRemoteInfo;
