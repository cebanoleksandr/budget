<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: this.$store.getters.getCategories.map(c => c.title),
        datasets: [
          {
            label: 'Expenses by category',
            data: this.$store.getters.getCategories.map(c => {
              return this.$store.getters.getRecords.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === 'outcome') {
                  total += +r.amount
                }
                return total
              }, 0)
            }),
            backgroundColor: this.getColorArray(this.$store.getters.getCategories.length),
          }
        ]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  methods: {
    getColorArray(length) {
      const arr = []

      for (let i = 0; i < length; i++) {
        const colors = [
          'hsl(0, 0%, 4%)',
          'hsl(0, 0%, 21%)',
          'hsl(204, 86%, 53%)',
          'hsl(141, 53%, 53%)',
          'hsl(48, 100%, 67%)',
          'hsl(348, 100%, 61%)',
          'hsl(171, 100%, 41%)',
          'hsl(217, 71%, 53%)',
        ]
        const color = colors[Math.floor(Math.random() * 8)]
        arr.push(color)
      }

      return arr;
    }
  }
}
</script>
