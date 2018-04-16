export default class PiwikTracker {
  constructor () {
    if (!this.enabled) return

    window._paq = []
    window._paq.push(['enableLinkTracking'])
    window._paq.push(['setTrackerUrl', this.piwikUrl()])
    window._paq.push(['setSiteId', this.piwikId()])

    // Create a script element and insert it in the DOM
    var pa = document.createElement('script')
    pa.type = 'text/javascript'
    pa.defer = true
    pa.async = true
    pa.src = this.piwikUrl()
    var firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(pa, firstScript)
  }

  trackPageView () {
    if (!this.enabled) return

    window._paq.push(['setCustomUrl', document.location])
    window._paq.push(['setDocumentTitle', document.title])
    window._paq.push(['trackPageView'])
  }

  piwikHost () {
    return process.env.VUE_APP_PIWIK_HOST
  }

  piwikId () {
    return process.env.VUE_APP_PIWIK_ID
  }

  piwikUrl () {
    return '//' + this.piwikHost() + '/js/'
  }

  enabled () {
    return this.piwikHost() && !this.piwikId()
  }
}
