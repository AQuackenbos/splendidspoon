<template>
  <div class="container">
    <Subscription v-model="subscription" />
    <ProductList v-model="products" />
  </div>
</template>

<script>
import Subscription from '@/components/Subscription'
import ProductList from '@/components/ProductList'

export default {
  name: 'ViewContainer',
  components: {
    Subscription,
    ProductList
  },
  data: () => ({
    subscription: null,
    products: []
  })
}
</script>
