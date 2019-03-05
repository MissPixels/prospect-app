# Pröspect app

[https://pröspect.art](https://xn--prspect-b1a.art/)

This repo contains the code for Pröspect's app.
The app is built with [Nuxt.js](https://nuxtjs.org/) and some cool libraries and modules, have a look at the [package.json](./package.json) to find out more.
The font we use is [IBM Plex](https://github.com/IBM/plex).

## Setup

### Install dependencies

```sh
$ yarn
```

### Create environment configuration

Create a `.env` file based on the example and adjust variables according to your needs.

```sh
$ cp .env.example .env
```

### Run the app

```sh
# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

## Deploy

To deploy the app, we rely on PM2 [ecosystem files](https://pm2.io/doc/en/runtime/guide/ecosystem-file/). More on info on deploying with PM2 can be found [here](https://pm2.io/doc/en/runtime/guide/easy-deploy-with-ssh/).

Deploy to dev:

```sh
$ pm2 deploy ecosystem.dev.config.js dev
```

Deploy to live:

```sh
$ pm2 deploy ecosystem.live.config.js live
```

## Credits

- **[Isabelle Gagné](http://www.isabellegagne.ca/)** - multimedia artist
- **[Paul Gascou-Vaillancourt](https://paulgv.com/)** - programmer
- **Stéphane Archambault** - poem