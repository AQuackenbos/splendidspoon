<template>
  <div>
    <h2 class="subtitle">Your Box</h2>
    <div class="section" v-if="subscription">
      <p><strong>Subscription: </strong> {{ subscription.name }}</p>
      <b-progress :value="pointsPercent" type="is-success" show-value>Value: {{ points }} / {{ subscription.maxValue }}</b-progress>
      <b-progress :value="volumePercent" type="is-info" show-value>Volume: {{ volume }} / {{ subscription.maxVolume }}</b-progress>
    </div>
    <div class="section" v-if="products.length > 0">
      <b-button type="is-success">Save</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name: 'Cart',
  computed: {
    ...mapState('cart', {
      subscription: state => state.subscription,
      products: state => state.products
    }),

    ...mapGetters('cart', [
      'points',
      'volume',
      'pointsPercent',
      'volumePercent'
    ])
  },
  methods: {
    ...mapActions('cart', [
      'removeProduct'
    ])
  }
}
</script>