<script>
export default {
  props: ['records'],
  methods: {
    formatCurrency(number) {
      if (typeof number === 'number') {
        return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      }
      return ''
    },
    dateFormat(value, format) {
      const options = {}

      if (format.includes('date')) {
        options.day = '2-digit',
        options.month = '2-digit',
        options.year = '2-digit'
      }

      if (format.includes('time')) {
        options.hour = '2-digit',
        options.minute = '2-digit',
        options.second = '2-digit'
      }

      return new Intl.DateTimeFormat('en-En', options).format(new Date(value))
    }
  }
}
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>
          <i class="fa fa-hashtag"></i>
        </th>
        <th>Sum</th>
        <th>Date</th>
        <th>Category</th>
        <th>Type</th>
        <th>Open</th>
      </tr>
    </thead>
  
    <tbody>
      <tr v-for="(record, index) of records" :key="record.id">
        <th>{{ index + 1}}</th>
        <td class="td">{{ formatCurrency(+record.amount) }} UAH</td>
        <td class="td">{{ dateFormat(record.date, 'datetime') }}</td>
        <td class="td">{{ record.categoryName }}</td>
        <td class="td">
          <div class="type" :class="record.typeClass">
            {{ record.typeText }}
          </div>
        </td>
        <td class="td">
          <router-link
            :to="'/detail/' + record.id"
            class="type green"
            title="Open the record"
          >
            <i class="fa fa-link"></i>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
.td {
  color: hsl(0, 0%, 21%);
}
.type {
  display: inline-block;
  padding: 0 10px;
  color: #fff;
  border-radius: 5px;
}
.red {
  background-color: hsl(348, 100%, 61%);
}
.green {
  background-color: hsl(141, 53%, 53%);
}
</style>
