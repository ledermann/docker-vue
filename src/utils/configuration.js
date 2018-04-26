import dotenv from 'dotenv'
dotenv.config()

export default class Configuration {
  static CONFIG = {
    backendHost: '$VUE_APP_BACKEND_HOST',
    matomoHost: '$VUE_APP_MATOMO_HOST',
    matomoId: '$VUE_APP_MATOMO_ID'
  }

  static value (name) {
    if (!(name in this.CONFIG)) {
      console.log(`Configuration: There is no key named "${name}"`)
      return
    }

    const value = this.CONFIG[name]

    if (!value) {
      console.log(`Configuration: Value for "${name}" is not defined`)
      return
    }

    if (value.startsWith('$')) {
      // value was not replaced, it seems we are in development.
      // Remove $ and look in process.env
      return process.env[value.substr(1)]
    } else {
      // value was already replaced, it seems we are in production.
      return value
    }
  }
}
