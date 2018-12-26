<template>
  <layout-basic>
    <div slot="hero-body" class="container has-text-centered">
      <h1 class="title">
        About this application
      </h1>
    </div>

    <div class="columns">
      <div class="column">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">
              Backend
            </p>
          </header>

          <div class="card-content">
            <b-loading :is-full-page="false" :active="isLoading" />

            <div class="content">
                <table class="table is-fullwidth">
                  <tr>
                    <th>Version</th>
                    <td>{{ backendVersions.version }}</td>
                  </tr>

                  <tr>
                    <th>Build time</th>
                    <td>
                      <timeago :datetime="backendVersions.build_time" :autoUpdate=5 />
                    </td>
                  </tr>

                  <tr>
                    <th>Ruby</th>
                    <td>{{ backendVersions.ruby }}</td>
                  </tr>

                  <tr>
                    <th>Rubygems</th>
                    <td>{{ backendVersions.rubygems }}</td>
                  </tr>

                  <tr>
                    <th>Rails</th>
                    <td>{{ backendVersions.rails }}</td>
                  </tr>

                  <tr>
                    <th>PostgreSQL</th>
                    <td>{{ backendVersions.postgresql }}</td>
                  </tr>

                  <tr>
                    <th>Elasticsearch</th>
                    <td>{{ backendVersions.elasticsearch }}</td>
                  </tr>

                  <tr>
                    <th>Redis</th>
                    <td>{{ backendVersions.redis }}</td>
                  </tr>
                </table>
            </div>
          </div>
        </div>

      </div>

      <div class="column">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">
              Frontend
            </p>
          </header>

          <div class="card-content">
            <div class="content">
              <table class="table is-fullwidth">
                <tr>
                  <th>Version</th>
                  <td>{{ frontendVersions.version }}</td>
                </tr>

                <tr>
                  <th>Build time</th>
                  <td>
                    <timeago :datetime="frontendVersions.buildTime" :autoUpdate=5 />
                  </td>
                </tr>

                <tr>
                  <th>Webpack</th>
                  <td>{{ frontendVersions.webpack }}</td>
                </tr>

                <tr>
                  <th>Vue.js</th>
                  <td>{{ frontendVersions.vue }}</td>
                </tr>

                <tr>
                  <th>VueRouter</th>
                  <td>{{ frontendVersions.vueRouter }}</td>
                </tr>

                <tr>
                  <th>Vuex</th>
                  <td>{{ frontendVersions.vuex }}</td>
                </tr>

                <tr>
                  <th>Bulma</th>
                  <td>{{ frontendVersions.bulma }}</td>
                </tr>

                <tr>
                  <th>Buefy</th>
                  <td>{{ frontendVersions.buefy }}</td>
                </tr>

                <tr>
                  <th>Axios</th>
                  <td>{{ frontendVersions.axios }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout-basic>
</template>

<script>
import Vue from 'vue'
import LayoutBasic from '@/layouts/LayoutBasic'
import globalPackageVersion from 'global-package-version'

export default {
  name: 'About',

  components: {
    LayoutBasic
  },

  data () {
    return {
      backendVersions: {},
      frontendVersions: {},
      isLoading: false
    }
  },

  mounted () {
    globalPackageVersion(require('@/../package.json'))
    globalPackageVersion(require('vue-router/package.json'))
    globalPackageVersion(require('vuex/package.json'))
    globalPackageVersion(require('buefy/package.json'))
    globalPackageVersion(require('bulma/package.json'))
    globalPackageVersion(require('axios/package.json'))
    globalPackageVersion(require('webpack/package.json'))

    this.frontendVersions = {
      version: window.packageVersion.dockerVue,
      buildTime: BUILDTIME,
      vue: Vue.version,
      vueRouter: window.packageVersion.vueRouter,
      vuex: window.packageVersion.vuex,
      buefy: window.packageVersion.buefy,
      bulma: window.packageVersion.bulma,
      axios: window.packageVersion.axios,
      webpack: window.packageVersion.webpack
    }

    this.isLoading = true
    this.$http.get('/about')
      .then(response => {
        this.backendVersions = response.data
        this.isLoading = false
      }).catch(error => {
        console.log(error)
        this.isLoading = false
      })
  }
}
</script>
