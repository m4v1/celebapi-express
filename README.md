# Celebapi Express

[![dependencies Status](https://david-dm.org/m4v1/celebapi-express/status.svg)](https://david-dm.org/m4v1/celebapi-express) [![Build Status](https://travis-ci.com/m4v1/celebapi-express.svg?branch=master)](https://travis-ci.com/m4v1/celebapi-express) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/d762343d85f04ba88d14fae35a1a9aa0)](https://www.codacy.com/manual/marco.vivi/celebapi-express?utm_source=github.com&utm_medium=referral&utm_content=m4v1/celebapi-express&utm_campaign=Badge_Grade)

Celebapi Express is a nodejs rest api to retrieve informations about celebrities and store them in a mysql database. It can use a redis chache, enabled in the .env configuration file.

## Prerequisites

<img src="https://img.shields.io/badge/MySQL-5.7.0-blue" /> <img src="https://img.shields.io/badge/Node-12.0.0-blue" />

You need to have [Node](https://nodejs.org/en/download/) and [MySQL](https://dev.mysql.com/downloads/) installed to run this app.

At the moment you can only use MySQL as persistence.

If you want to use to cache system, you need to have Redis installed.

## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) to install Celebapi Express.

```bash
git clone https://github.com/m4v1/celebapi-express
cd celebapi-express
npm i
mv .env.orig .env
```

now edit .env file and add your configuration, then:

```bash
npm run build
```

will build the code and put it into the /dist folder.

You should also edit Knex configuration file [knexfile.js](https://github.com/m4v1/celebapi-express/blob/master/knexfile.js) according to your MySQL config.

Use Knex command line tool to run db migrations:

```bash
npx cross-env NODE_ENV=production knex migrate:latest
```

Now to start the api with:

```bash
npm run prod
```

If you use [PM2](https://pm2.keymetrics.io/) to run node apps (and you should), you can start the api with the [ecosystem](https://github.com/m4v1/celebapi-express/blob/master/ecosystem.config.js) file provided in the repository, and of course you can edit it with your preferences:

```bash
pm2 start ecosystem.config.js
```

## Usage

to get infos you use the /info/ route and the urlencoded name as parameter:

```bash
curl -X GET host:port/info/michael%20jackson
```

and you will get:

```json
{
  "data": {
    "name": "michael jackson",
    "bday": "1958-08-29",
    "bplace": "Gary IN",
    "bio": "The King of Pop who became the most successful singer in American history etc."
  },
  "message": "remote",
  "status": 200
}
```

to get videos you use the /videos/ route and the urlencoded name as parameter:

```bash
curl -X GET host:port/videos/michael%20jackson
```

and you will get 6 youtube videos:

```json
{
  "data": [
    {
      "link": "https://www.youtube.com/watch?v=h_D3VFfhvs4",
      "title": "Michael Jackson - Smooth Criminal (Official Video)",
      "thumb": "https://i.ytimg.com/vi/h_D3VFfhvs4/hqdefault.jpg"
    },
    {
      "link": "https://www.youtube.com/watch?v=Zi_XLOBDo_Y",
      "title": "Michael Jackson - Billie Jean (Official Music Video)",
      "thumb": "https://i.ytimg.com/vi/Zi_XLOBDo_Y/hqdefault.jpg"
    },
    {
      "link": "https://www.youtube.com/watch?v=sOnqjkJTMaA",
      "title": "Michael Jackson - Thriller (Official Video)",
      "thumb": "https://i.ytimg.com/vi/sOnqjkJTMaA/hqdefault.jpg"
    },
    {
      "link": "https://www.youtube.com/watch?v=LeiFF0gvqcc",
      "title": "Michael Jackson - Remember The Time (Official Video)",
      "thumb": "https://i.ytimg.com/vi/LeiFF0gvqcc/hqdefault.jpg"
    },
    {
      "link": "https://www.youtube.com/watch?v=oRdxUFDoQe0",
      "title": "Michael Jackson - Beat It (Official Video)",
      "thumb": "https://i.ytimg.com/vi/oRdxUFDoQe0/hqdefault.jpg"
    },
    {
      "link": "https://www.youtube.com/watch?v=-i9zrCR9NDU",
      "title": "Michael Jackson&#39;s Ghost Speaks To Me At The Neverland Ranch",
      "thumb": "https://i.ytimg.com/vi/-i9zrCR9NDU/hqdefault.jpg"
    }
  ],
  "message": "remote",
  "status": 200
}
```

## Contributing

Pull requests are welcome.

For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://github.com/m4v1/celebapi-express/blob/master/LICENSE)
