import Configuration from '@/utils/configuration'

export default class MatomoTracker {
  constructor () {
    if (!this.enabled) return

    window._paq = []
    window._paq.push(['enableLinkTracking'])
    window._paq.push(['setTrackerUrl', this.matomoUrl()])
    window._paq.push(['setSiteId', this.matomoId()])

    // Create a script element and insert it in the DOM
    var pa = document.createElement('script')
    pa.type = 'text/javascript'
    pa.defer = true
    pa.async = true
    pa.src = this.matomoUrl()
    var firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(pa, firstScript)
  }

  trackPageView () {
    if (!this.enabled) return

    window._paq.push(['setCustomUrl', document.location])
    window._paq.push(['setDocumentTitle', document.title])
    window._paq.push(['disableCookies'])
    window._paq.push(['trackPageView'])
  }

  matomoHost () {
    return Configuration.value('matomoHost')
  }

  matomoId () {
    return Configuration.value('matomoId')
  }

  matomoUrl () {
    return '//' + this.matomoHost() + '/js/'
  }

  enabled () {
    return this.matomoHost() && !this.matomoId()
  }
}
