import { getSubscriptions } from '@/plugins/splendidspoon'
import { sendToast, sendDebug } from '@/helpers/messaging'
export default {
  namespaced: true,
  state: () => ({
    subscriptions: []
  }),
  mutations: {
    SET(state, subs) {
      state.subscriptions = subs
    }
    // No other CRUD needed for demo
  },
  actions: {
    load({ commit }) {
      return getSubscriptions()
        .then(data => {
          commit('SET', data.subscriptions)
        })
        .catch(err => {
          commit('SET', [])
          sendToast('Could not load subscriptions!', { type: 'is-error' })
          sendDebug(err)
        })
    }
  }
}