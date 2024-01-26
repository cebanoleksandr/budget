<script>
import Loader from '@/components/Loader.vue'
import { fetchCurrency } from '@/api/currency.js'

export default {
  name: 'planning',
  data: () => ({
    loading: true,
    currency: null
  }),
  components: {
    Loader
  },
  mounted() {
    fetchCurrency()
      .then((res) => {
        console.log(res.data);
        this.currency = res.data
        this.loading = false
      })
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories.map(cat => {
        const spend = this.$store.getters.getRecords
          .filter(r => r.categoryId === cat.id)
          .filter(r => r.type === 'outcome')
          .reduce((total, record) => {
            return total += +record.amount
          }, 0)

        const percent = 100 * spend / cat.limit
        const progressPercent = percent > 100 ? 100 : percent
        const progressColor = percent < 60
          ? 'green'
          : percent < 100
            ? 'yellow'
            : 'red'

        return {
          ...cat,
          progressPercent,
          progressColor,
          spend,
        }
      })
    },
    bill() {
      return this.$store.getters.bill.bill
    },
    base() {
      return this.$store.getters.bill.bill / (this.currency?.rates['UAH'] / this.currency?.rates['EUR'])
    }
  },
  methods: {
    getCurrency(currency) {
      return (this.base * this.currency?.rates[currency]).toFixed(2)
    },
    formatCurrency(number) {
      if (typeof number === 'number') {
        return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      }
      return ''
    }
  }
}
</script>

<template>
  <div class="columns">
    <div class="column is-9">
      <h2 class="is-size-2 mb-2">Planning</h2>
    </div>

    <div class="column is-3 mt-2">
      <h4 class="is-size-3">{{ getCurrency('UAH') }} UAH</h4>
    </div>
  </div>

  <div class="hr"></div>

  <Loader v-if="loading" />

  <h3 v-else-if="!categories.length" class="is-size-3 has-text-centered w100 mt-6">
    There are no categories. &nbsp;
    <router-link to="/categories">Add category</router-link>
  </h3>

  <div
    v-else
    class="mt-4"
    v-for="cat of categories"
    :key="cat.id"
    :title="cat.spend > +cat.limit
      ? 'Excess by ' + (cat.spend - +cat.limit) + ' UAH'
      : +cat.limit - cat.spend + ' UAH left'"
  >
    <p class="is-size-4">
      <strong>{{ cat.title }}: </strong>
      {{ formatCurrency(cat.spend) }} from {{ formatCurrency(+cat.limit) }}
    </p>

    <div class="progress mb-5">
      <div
        class="determinate"
        :style="{
          width: cat.progressPercent + '%',
          background: cat.progressColor,
        }"
      ></div>
    </div>
  </div>
</template>

<style>
.hr {
  height: 1px;
  width: 100%;
  background-color: hsl(0, 0%, 71%);
}
.progress {
  height: 5px;
  width: 100%;
  background-color: rgb(186, 255, 186);
}
.determinate {
  height: 5px;
}
</style>
