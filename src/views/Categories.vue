<script>
import CategoryCreate from '@/components/CategoryCreate.vue'
import CategoryEdit from '@/components/CategoryEdit.vue'

export default {
  name: 'categories',
  components: {
    CategoryCreate,
    CategoryEdit
  },
  computed: {
    message() {
      return this.$store.getters.message
    }
  },
}
</script>

<template>
  <h2 class="is-size-2 mb-2">Categories</h2>

  <div class="hr"></div>

  <div class="section columns">
    <CategoryCreate />
    <CategoryEdit v-if="this.$store.getters.getCategories.length" />

    <div v-else class="has-text-centered w100">
      <h3 class="is-size-3">There are no categories yet</h3>
    </div>
  </div>

  <div
    v-if="!!message"
    class="notification absolute is-success"
  >
    <button class="delete"></button>
    <strong>{{ message }}</strong>
  </div>
</template>

<style>
.hr {
  height: 1px;
  width: 100%;
  background-color: hsl(0, 0%, 71%);
}
.fix-height {
  height: 20px;
}
.absolute {
  position: absolute;
  top: 0;
  right: 40px;
}
</style>
