/*
** Originally implemented an axios handler for cross-browser compat guarantees
** However netlify's CORS policy proved troublesome during testing
** Instead, will fall back on core browser `fetch` library - which should be suitable for a demonstration.

import axios from 'axios'

const client = axios.create({
  baseURL: 'https://mystifying-spence-dc3bda.netlify.app/build-a-box',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  }
})

const getSubscriptions = () => client.get('/subscriptions.json')
const getProducts = () => client.get('/products.json')
*/
const configuration = {
  baseUrl: 'https://mystifying-spence-dc3bda.netlify.app/build-a-box',
  requestConfig: {
    method: 'GET'
  },
  endpoints: {
    subscriptions: '/subscriptions.json',
    products: '/products.json'
  }
}

const _makeRequest = (endpoint, config) => {
  let target = configuration.baseUrl + endpoint
  return fetch(target, {
    ...configuration.requestConfig,
    ...config
  }).then(r => r.json())
}

const getSubscriptions = (config = {}) => {
  return _makeRequest(configuration.endpoints.subscriptions, config)
}

const getProducts = (config = {}) => {
  return _makeRequest(configuration.endpoints.products, config)
}



export {
  getProducts,
  getSubscriptions
}