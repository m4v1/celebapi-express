# Celebapi Express

Celebapi Express is a nodejs rest api to retrieve informations about celebrities and store them in a mysql database. It can use a redis chache, enabled in the .env configuration file.

### Project status

[![dependencies Status](https://david-dm.org/m4v1/celebapi-express/status.svg)](https://david-dm.org/m4v1/celebapi-express)

### Prerequisites

You need to have:

Node >= 12.0.0

MySQL => 5.7.0

installed to run this app.

At the moment you can only use Mysql as persistence.

If you want to use to cache system, you need to have Redis installed.

## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) to install Celebapi Express.

```bash
git clone https://github.com/m4v1/celebapi-express
cd celebapi-express
mv .env.orig .env
```

now edit .env file and add your configuration, then:

```bash
npm run build
```

will build the code and put it into the /dist folder.

You should also edit Knex configuration file [knexfile.js](https://github.com/m4v1/celebapi-express/blob/master/knexfile.js) according to your mysql config.

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
