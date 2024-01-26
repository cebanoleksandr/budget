<script>
import TopDropdown from '@/components/TopDropdown.vue'

export default {
  data: () => ({
    date: new Date(),
    interval: null
  }),
  components: {
    TopDropdown
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
  methods: {
    dateFormat(value, format = 'date') {
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
  <nav class="navbar has-shadow is-warning mb-4">
    <div class="navbar-brand nav-brand">
      <a class="navbar-item" @click.prevent="$emit('onClick')">
        <i class="fa fa-bars fa-2x"></i>
      </a>
      <span class="ml-4">{{ dateFormat(date, 'datetime') }}</span>
    </div>

    <div class="navbar-menu" id="nav-links">
      <div v-if="this.$store.getters.user" class="navbar-end drop-container">
        <TopDropdown />
      </div>

      <div v-else class="navbar-end">
        <router-link class="navbar-item" to="/login">Login</router-link>
        <router-link class="navbar-item" to="/register">Register</router-link>
      </div>
    </div>
  </nav>
</template>

<style>
.burger-icon {
  width: 40px;
  height: 40px;
}
.drop-container {
  display: flex;
  align-items: center;
  padding-right: 24px;
}
.nav-brand {
  display: flex;
  align-items: center;
}
</style>
