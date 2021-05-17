<template>
  <div class="container">
    <h2 class="title is-size-5">Select your Subscription Size!</h2>
    <b-field>
      <b-select placeholder="Subscription Options" @input="updateSubscription($event)">
        <option v-for="sub in availableSubscriptions" :key="sub.id" :value="sub">{{ sub.name }}</option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Subscription',
  computed: {
    ...mapState('subscriptions', {
      availableSubscriptions: state => state.entities
    })
  },
  mounted() {
    this.loadSubscriptions()
  },
  methods: {
    ...mapActions('subscriptions', {
      loadSubscriptions: 'load'
    }),

    ...mapActions('cart', {
      setSubscription: 'setSubscription'
    }),

    updateSubscription(value) {
      this.setSubscription(value)
    },
  }
}
</script>