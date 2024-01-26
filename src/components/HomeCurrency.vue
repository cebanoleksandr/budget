<script>
export default {
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['UAH', 'PLN', 'USD', 'EUR']
  }),
  methods: {
    dateFormat(value) {
      const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }

      return new Intl.DateTimeFormat('en-En', options).format(new Date(value))
    }
  }
}
</script>

<template>
  <div class="column is-8">
    <div class="bg-danger min-height-200 px-3 py-3 currency-block">
      <h3 class="is-size-3 mb-4">Exchange Rates</h3>

      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="cur of currencies" :key="cur">
            <td>{{ cur }}</td>
            <td>{{ rates[cur].toFixed(2) }}</td>
            <td>{{ dateFormat(date) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.currency-block {
  border-radius: 5px;
}
</style>
