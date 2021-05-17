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

export {
  getProducts,
  getSubscriptions
}