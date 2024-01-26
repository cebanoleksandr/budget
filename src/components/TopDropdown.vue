<script>
import { logoutAPI } from '@/api/auth'

export default {
  data: () => ({
    isOpen: false
  }),
  computed: {
    userName() {
      return this.$store.getters.user?.name || 'User name'
    }
  },
  methods: {
    onDropdownHandler() {
      this.isOpen = !this.isOpen
    },
    logout() {
      logoutAPI(this.$store.getters.user?.id || '0')
        .then(() => {
          this.$store.commit('clearUser')
          this.$router.push('/login?message=logout')
          this.onDropdownHandler()
        })
    }
  }
}
</script>

<template>
  <div
    class="dropdown is-warning"
    :class="{
      'is-active': isOpen
    }"
  >
    <div class="dropdown-trigger">
      <button
        class="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        @click="onDropdownHandler"
      >
        <span>{{ userName }}</span>
        <span class="icon is-small">
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div
      class="dropdown-menu"
      id="dropdown-menu"
      role="menu"
    >
      <div class="dropdown-content">
        <router-link
          to="/profile"
          class="dropdown-item"
          @click="isOpen = false"
        >
          Profile
        </router-link>
        <router-link
          to="/"
          class="dropdown-item"
          @click="isOpen = false"
        >
          Home
        </router-link>
        <router-link
          to="/history"
          class="dropdown-item"
          @click="isOpen = false"
        >
          History
        </router-link>
        <router-link
          to="/planning"
          class="dropdown-item"
          @click="isOpen = false"
        >
          Planning
        </router-link>
        <router-link
          to="/categories"
          class="dropdown-item"
          @click="isOpen = false"
        >
          Categories
        </router-link>
        <hr class="dropdown-divider">
        <a
          href="#"
          class="dropdown-item"
          @click.prevent="logout"
        >
          Logout
        </a>
      </div>
    </div>
  </div>
</template>

<style></style>
