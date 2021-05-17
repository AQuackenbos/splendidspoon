import { getProducts } from '@/plugins/splendidspoon'
import { sendToast, sendDebug } from '@/helpers/messaging'
export default {
  namespaced: true,
  state: () => ({
    entities: []
  }),
  getters: {
    getProduct: (state) => (id) => {
      return state.entities.find(p => p.id === id)
    }
  },
  mutations: {
    SET(state, prods) {
      state.entities = prods
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