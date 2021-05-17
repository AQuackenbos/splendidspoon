import { sendDebug, sendToast } from '@/helpers/messaging'
export default {
  namespaced: true,
  state: () => ({
    products: [],
    subscription: null
  }),
  getters: {
    volume(state) {
      return state.products.reduce((ac,p) => {
        return ac + (p.qty * p.volume)
      }, 0)
    },

    points(state) {
      return state.products.reduce((ac,p) => {
        return ac + (p.qty * p.points)
      }, 0)
    },

    volumePercent(state, getters) {
      if(!state.subscription) return 0
      return (getters.volume / state.subscription.maxVolume) * 100
    },

    pointsPercent(state, getters) {
      if(!state.subscription) return 0
      return (getters.points / state.subscription.maxValue) * 100
    },
    
    getCartProduct: (state) => (id) => {
      return state.products.find(p => p.id === id)
    },

    canAddProduct: (state,getters) => (product, qtyDiff) => {
      if(!state.subscription) return false
      let prodVolume = (product.volume * qtyDiff)
      let prodValue = (product.points * qtyDiff)

      return (
        (state.subscription.maxVolume >= (getters.volume + prodVolume))
        && (state.subscription.maxValue >= (getters.points + prodValue))
      )
    }
  },
  mutations: {
    SET_PRODUCTS(state, prods) {
      state.products = prods
    },

    SET_SUBSCRIPTION(state, sub) {
      state.subscription = sub
    }
  },
  actions: {
    setProducts({ commit }, products) {
      let unique = products.filter((v,i,s) => s.findIndex(f => f.id === v.id) === i)
      commit('SET_PRODUCTS', unique)
    },

    setSubscription({ commit }, subscription) {
      if(!subscription || !subscription.id) {
        sendToast('Invalid Subscription.', { type: 'is-error'})
        return
      }

      commit('SET_SUBSCRIPTION', subscription)
      commit('SET_PRODUCTS',[])
    },

    updateProduct({ state, getters, dispatch }, product) {
      if(!product || !product.id) {
        sendToast('Invalid Product.', { type: 'is-error'})
        return
      }

      let existing = state.products.find(p => p.id === product.id)
      if(!existing) {
        existing = { qty: 0 }
      }

      let qtyDiff = product.qty - existing.qty
      if(product.qty <= 0) {
        return dispatch('removeProduct', product)
      } else if(qtyDiff !== 0) {
        if(getters.canAddProduct(product, qtyDiff)) {
          let prodList = [...state.products, product].map(p => {
            if(p.id === product.id) {
              p.qty = product.qty
            }
            return p
          })

          dispatch('setProducts', prodList)
          if(existing.qty === 0) {
            sendToast(`Added ${product.name} to your box!`, { type: 'is-success'})
          }
        }
      } else { // qtyDiff === 0
        sendDebug('No update required.')
      }
    },

    removeProduct({ state, dispatch }, product) {
      if(!product || !product.id) {
        sendToast('Invalid Product.', { type: 'is-error'})
        return
      }

      let existingIdx = state.products.findIndex(p => p.id === product.id)
      if(existingIdx === -1) {
        sendToast('Invalid Product.', { type: 'is-error'})
        return
      }

      let prodList = [...state.products]
      prodList.splice(existingIdx,1)
      dispatch('setProducts', prodList)
    }
  }
}