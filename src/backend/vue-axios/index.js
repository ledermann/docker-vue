import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

const API_URL = process.env.API_URL || 'https://docker-rails.georg-ledermann.de/api/v1'

const customAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json'
  }
})

Vue.use(VueAxios, customAxios)
