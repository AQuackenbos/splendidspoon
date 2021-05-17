import Vue from 'vue'
import Vuex from 'vuex'

// To store the user's cart between reloads, we'd use the `vuex-persistedstate` module,
// and add a `cart` module; likely a `user` module also.

Vue.use(Vuex)

import Subscriptions from '@/store/modules/subscriptions'
import Products from '@/store/modules/products'

export default new Vuex.Store({
  modules: {
    products: Products,
    subscriptions: Subscriptions
  }
})
