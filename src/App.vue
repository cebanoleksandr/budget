<script>
// import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { isAuthAPI } from './api/auth'
import { getBillAPI } from './api/bill'
import { getCategoriesAPI } from './api/category'
import { getRecordsAPI } from './api/record'

export default {
  data: () => ({
    isOpen: true,
    isVisible: true
  }),
  components: {
    Navbar,
    Sidebar
  },
  mounted() {
    const user = localStorage.getItem('currentUser')

    if (!!user) {
      isAuthAPI(JSON.parse(user)?.id)
        .then((res) => {
          if (!!res.data) {
            this.$store.commit('setUser', res.data)
            getBillAPI(res.data.id)
              .then(res => {
                this.$store.commit('setBill', res.data)
              })
            getCategoriesAPI(res.data.id)
              .then(res => {
                this.$store.commit('setCategories', res.data)
              })
            getRecordsAPI(res.data.id)
              .then(res => {
                this.$store.commit('setRecords', res.data)
              })
          } else {
              this.$router.push('/login')
            }
        })
    } else {
      this.$router.push('/login')
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<template>
  <Navbar @onClick="toggleMenu" />

  <div class="container main-container">
    <div v-if="this.$store.getters.user" :class="{
      'menu-block': isOpen,
      'hidden-menu': !isOpen
    }">
      <Sidebar :isOpen="isOpen" />
    </div>

    <div
      class="main-content px-5"
      :class="{
        'open-content': !isOpen
      }"
    >
      <router-view />
    </div>

    <router-link to="/record" class="add">
      <i class="fa fa-plus has-text-light" title="Add new record"></i>
    </router-link>
  </div>
</template>

<style scoped>
.menu-block {
  border-right: 1px solid grey;
  min-height: calc(100vh - 70px);
  width: 200px;
  overflow: hidden;
  transition: all .5s ease-in-out;
}
.hidden-menu {
  width: 0;
  opacity: 0;
  transition: all .5s ease-in-out;
}
.main-container {
  display: flex;
}
.main-content {
  width: 100%;
}
.add {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: hsl(217, 71%, 45%);
}
</style>
