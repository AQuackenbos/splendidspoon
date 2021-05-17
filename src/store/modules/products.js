import { getProducts } from '@/plugins/splendidspoon'
import { sendToast, sendDebug } from '@/helpers/messaging'
export default {
  namespaced: true,
  state: () => ({
    products: []
  }),
  mutations: {
    SET(state, prods) {
      state.products = prods
    }
    // No other CRUD needed for demo
  },
  actions: {
    load({ commit }) {
      return getProducts()
        .then(data => {
          commit('SET', data.products)
        })
        .catch(err => {
          commit('SET', [])
          sendToast('Could not load products!', { type: 'is-error' })
          sendDebug(err)
        })
    }
  }
}