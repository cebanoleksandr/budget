<script>
import HomeBill from '@/components/HomeBill.vue'
import HomeCurrency from '@/components/HomeCurrency.vue'
import Loader from '@/components/Loader.vue'
import { fetchCurrency } from '@/api/currency.js'

export default {
  data: () => ({
    loading: true,
    currency: null
  }),
  mounted() {
    fetchCurrency()
      .then((res) => {
        console.log(res.data);
        this.currency = res.data
        this.loading = false
      })
  },
  components: {
    HomeBill,
    HomeCurrency,
    Loader
  },
  methods: {
    refresh() {
      this.loading = true
      fetchCurrency()
      .then((res) => {
        console.log(res.data);
        this.currency = res.data
        this.loading = false
      })
    }
  }
}
</script>

<template>
  <h2 class="is-size-2 mb-2">Account</h2>

  <div class="hr mb-4"></div>

  <Loader v-if="loading" />

  <div v-else class="px-3 pt-4 account-container">
    <div class="columns gap">
      <HomeBill :rates="currency.rates" />

      <HomeCurrency
        :rates="currency.rates"
        :date="currency.date"
      />
    </div>
  </div>

  <div class="absolute2">
    <i class="fa fa-refresh refresh" @click="refresh"></i>
  </div>
</template>

<style>
.hr {
  height: 1px;
  width: 100%;
  background-color: hsl(0, 0%, 71%);
}
.absolute2 {
  position: absolute;
  top: 20px;
  right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 5px;
  background-color: hsl(141, 53%, 53%);
  cursor: pointer;
}
.refresh {
  color: #fff;
}
</style>
