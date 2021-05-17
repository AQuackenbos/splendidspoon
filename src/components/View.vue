<template>
  <div class="container">
    <div class="columns">
      <div class="column is-9">
        <Subscription />
        <ProductList v-show="subscription" />
      </div>
      <div class="column is-3">
        <Cart />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Subscription from '@/components/Subscription'
import ProductList from '@/components/ProductList'
import Cart from '@/components/Cart'

export default {
  name: 'ViewContainer',
  components: {
    Subscription,
    ProductList,
    Cart
  },
  computed: {
    ...mapState('cart', {
      subscription: state => state.subscription
    })
  }
}
</script>
