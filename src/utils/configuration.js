import dotenv from 'dotenv'
dotenv.config()

export default class Configuration {
  static backendHost () {
    return this.getValue('$VUE_APP_BACKEND_HOST')
  }

  static matomoHost () {
    return this.getValue('$VUE_APP_MATOMO_HOST')
  }

  static matomoId () {
    return this.getValue('$VUE_APP_MATOMO_ID')
  }

  // ################

  static getValue (name) {
    if (name.startsWith('$')) {
      // name was not replaced, it seems we are in development.
      // Remove $ and look in process.env
      return process.env[name.substr(1)]
    } else {
      // name was already replaced, it seems we are in production.
      return name
    }
  }
}
