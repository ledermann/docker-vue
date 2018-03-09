import axios from 'axios'

const API_URL = process.env.API_URL || 'https://docker-rails.georg-ledermann.de'

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
