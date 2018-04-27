# DockerVue

Single-page application (SPA) built with [Vue.js](https://vuejs.org/). It's is a very simple kind of CMS (content management system) allowing to manage posts (articles) with images.

This is the frontend only. The backend is a separate project called [DockerRails](https://github.com/ledermann/docker-rails), created with Ruby on Rails and responding as an JSON API.


## Tools used

- Project scaffolding with [Vue Cli](https://github.com/vuejs/vue-cli)
- Routing with [Vue Router](https://router.vuejs.org/en/)
- State management for authentication with [Vuex](https://vuex.vuejs.org/en/)
- Package building with [Webpack](https://webpack.js.org/) and [Yarn](https://yarnpkg.com/lang/en/)
- Styling with [Bulma](https://bulma.io/), [Buefy](https://buefy.github.io/) and [FontAwesome](https://fontawesome.com/how-to-use/js-component-packages)
- API calls with [Axios](https://github.com/axios/axios)
- Deployment with [Nginx](https://nginx.org/en/) and [Docker](https://www.docker.com/)


## Features

- User authentication using [JSON Web Token (JWT)](https://de.wikipedia.org/wiki/JSON_Web_Token)
- Infinitive scrolling using [Vue-infinite-loading](https://github.com/PeachScript/vue-infinite-loading)
- Auto refresh via [ActionCable](https://yarnpkg.com/en/package/actioncable)
- Searching with [Buefy Autocomplete](https://buefy.github.io/#/documentation/autocomplete)
- Content editing with the WYSIWYG editor [Pell](https://github.com/jaredreich/pell)
- Image gallery with [Silentbox](https://github.com/silencesys/silentbox)
- Uploading images directly to Amazon S3 (presigned by the backend)


## Demo

There is a live demo at https://docker-vue.georg-ledermann.de/


## Development

First, make sure to get the backend up and running:
https://github.com/ledermann/docker-rails

Make sure the backend is available locally, for example at https://docker-rails.dev. Then:

```bash
git clone git@github.com:ledermann/docker-vue.git
cd docker-vue
cp .env.local.example .env.local
yarn install
yarn serve
```


## Why?

I built this application to learn Vue.js.
