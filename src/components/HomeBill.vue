<script>
export default {
  props: ['rates'],
  data: () => ({
    currencies: ['UAH', 'PLN', 'USD', 'EUR']
  }),
  computed: {
    base() {
      return this.$store.getters.bill.bill / (this.rates['UAH'] / this.rates['EUR'])
    }
  },
  methods: {
    getCurrency(currency) {
      return (this.base * this.rates[currency]).toFixed(2)
    }
  }
}
</script>

<template>
  <div class="column is-4">
    <div class="bg-blue min-height-200 px-3 py-3 bill-block">
      <h3 class="is-size-3 mb-4">Count</h3>

      <p
        v-for="cur of currencies"
        :key="cur"
      >
        {{ getCurrency(cur) }} {{ cur }}
        <div class="hr mt-1 mb-4"></div>
      </p>
    </div>
  </div>
</template>

<style>
.bill-block {
  border-radius: 5px;
}
</style>
