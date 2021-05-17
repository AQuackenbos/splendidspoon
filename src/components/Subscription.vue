<template>
  <div class="container">
    (SUB)
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Subscription',
  props: {
    value: Object
  },
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
    })
  }
}
</script>