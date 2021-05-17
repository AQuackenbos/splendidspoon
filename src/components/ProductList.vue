<template>
  <div class="container">
    <h2 class="title is-size-5 mt-5">Add Products to your Box!</h2>
    <div class="columns is-multiline">
      <Product
        v-for="product in availableProducts"
        :key="product.id"
        :pid="product.id"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Product from '@/components/Product'

export default {
  name: 'ProductList',
  components: {
    Product
  },
  mounted() {
    this.loadProducts()
  },
  computed: {
    ...mapState('products', {
      availableProducts: state => state.entities
    })
  },
  methods: {
    ...mapActions('products', {
      loadProducts: 'load'
    })
  }
}
</script>