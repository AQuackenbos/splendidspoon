<template>
  <div class="column is-4" v-if="product">
    <div class="card">
      <header class="card-header">
        <span class="tag is-dark" v-if="product.category">{{ product.category.name }}</span>
        <p class="card-header-title">{{ product.name }}</p>
      </header>
      <div class="card-content">
        <div class="level">
          <strong>Cost: </strong> {{ product.points }}
          <strong>Size: </strong> {{ product.volume }}
        </div>
        <div class="content" v-if="!canIncrease">
          <em class="add-error is-size-7" v-if="product.volume + volume > subscription.maxVolume">There is not enough room in the box for this item!</em>
          <em class="add-error is-size-7" v-if="product.points + points > subscription.maxValue">You don't have enough points left to add this item!</em>
        </div>
      </div>
      <div class="card-footer">
        <a @click.prevent="decreaseQty" href="#" class="card-footer-item is-size-3"><span v-if="canDecrease">-</span></a>
        <div class="card-footer-item is-size-3" v-html="qtyToRender"></div>
        <a @click.prevent="increaseQty" href="#" class="card-footer-item is-size-3"><span v-if="canIncrease">+</span></a>
      </div>
    </div>
  </div>
</template>

<style scoped>
em.add-error {
  color: #999;
  display: inline-block;
}
</style>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Product',
  props: {
    pid: String
  },
  computed: {
    ...mapState('cart', [
      'subscription'
    ]),

    ...mapGetters('cart', [
      'volume',
      'points',
      'canAddProduct',
      'getCartProduct'
    ]),

    ...mapGetters('products', [
      'getProduct'
    ]),

    product() {
      if(!this.pid) return null
      return this.getProduct(this.pid)
    },

    cartProduct() {
      if(!this.pid) return null
      let cartProd = this.getCartProduct(this.pid)
      return { ...this.product, qty: 0, ...cartProd }
    },

    qtyToRender() {
      if(this.cartProduct.qty === 0) {
        return "&nbsp;"
      }

      return this.cartProduct.qty
    },

    canDecrease() {
      return this.cartProduct.qty > 0
    },

    canIncrease() {
      return this.canAddProduct(this.cartProduct,1)
    }
  },
  methods: {
    ...mapActions('cart', [
      'updateProduct'
    ]),

    increaseQty() {
      if(!this.canIncrease) return

      let request = { ...this.cartProduct, qty: ++this.cartProduct.qty }
      this.updateProduct(request)
    },

    decreaseQty() {
      if(!this.canDecrease) return

      let request = { ...this.cartProduct, qty: --this.cartProduct.qty }
      this.updateProduct(request)
    }
  }
}
</script>