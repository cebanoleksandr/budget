<script>
import HistoryTable from '@/components/HistoryTable.vue'
import Pagination from '@/components/Pagination.vue'
import PieChart from '@/components/PieChart.vue'

export default {
  name: 'history',
  components: {
    HistoryTable,
    Pagination,
    PieChart
  },
  computed: {
    page() {
      return +this.$route.query.page || 1
    },
    records() {
      return this.$store.getters.getRecords.map(record => {
        return {
          ...record,
          categoryName: this.$store.getters.getCategories.find(c => c.id === record.categoryId)?.title,
          typeClass: record.type === 'outcome' ? 'red' : 'green',
          typeText: record.type === 'outcome' ? 'Outcome' : 'Income',
        }
      })
    },
    getRecords() {
      const from = (this.page - 1) * 5
      const to = (this.page - 1) * 5 + 5

      return this.records.slice(from, to)
    }
  }
}
</script>

<template>
  <div class="history-chart">
    <PieChart />
  </div>

  <h4 v-if="!records.length" class="is-size-4 has-text-centered">
    There no records yet
  </h4>

  <div v-else>
    <HistoryTable :records="getRecords" />
    <Pagination
      :pagesLength="Math.ceil(records.length / 5)"
      :page="page"
    />
  </div>
</template>

<style>
.hr {
  height: 1px;
  width: 100%;
  background-color: hsl(0, 0%, 71%);
}
</style>
