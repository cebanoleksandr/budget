<script>
import { getRecordAPI } from '@/api/record';
import Loader from '@/components/Loader.vue'

export default {
  name: 'detail',
  data: () => ({
    record: null,
    loading: true,
    category: null,
  }),
  components: {
    Loader
  },
  mounted() {
    getRecordAPI(this.$route.params.id)
      .then(res => {
        if (!res.data) {
          this.$router.push('/not-found-page')
          return
        }

        const record = res.data;
        const category = this.$store.getters.getCategories
          .find(c => c.id === res.data.categoryId) || null

        this.record = {
          ...record,
          categoryName: category.title,
          typeClass: record.type === 'outcome' ? 'red' : 'green',
          typeText: record.type === 'outcome' ? 'Outcome' : 'Income',
        }
      })
      .catch((e) => {
        console.log('Error', e);
      })
      .finally(() => {
        this.loading = false
      })
  },
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
        options.month = 'long',
        options.year = 'numeric'
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
  <Loader v-if="loading" />

  <div v-else>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <router-link to="/history">
            History
          </router-link>
        </li>
        <li class="is-active">
          <router-link to="#" aria-current="page">
            {{ record.typeText }}
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="detail-block white" :class="record.typeClass">
      <h5 class="is-size-5">
        <strong class="white">Description: </strong> {{ record.description }}
      </h5>
      <h5 class="is-size-5">
        <strong class="white">Sum: </strong> {{ formatCurrency(+record.amount) }} UAH
      </h5>
      <h5 class="is-size-5 mb-4">
        <strong class="white">Category: </strong> {{ record.categoryName }}
      </h5>

      <small>{{ dateFormat(record.date, 'datetime') }}</small>
    </div>
  </div>
</template>

<style>
.detail-block {
  margin: 0 auto;
  width: 80%;
  padding: 1rem;
  border-radius: 5px;
}
.white {
  color: #fff;
}
.red {
  background-color: hsl(348, 100%, 61%);
}
.green {
  background-color: hsl(141, 53%, 53%);
}
</style>
