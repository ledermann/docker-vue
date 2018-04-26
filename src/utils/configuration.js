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
      // In development env. Remove $ and look in process.env
      return process.env[name.substr(1)]
    } else {
      // In production env. variable was already replaced
      return name
    }
  }
}
