<script>
export default {
  name: 'pagination',
  props: ['pagesLength', 'page'],
  computed: {
    pages() {}
  }
}
</script>

<template>
  <nav
    class="pagination is-small is-rounded"
    role="navigation"
    aria-label="pagination"
  >
    <router-link
      v-if="page > 1"
      :to="'/history?page=' + (page - 1)"
      class="pagination-previous"
    >
      Previous
    </router-link>
    <a v-else class="pagination-next" disabled>
      Previous
    </a>
    <router-link
      v-if="page < pagesLength"
      :to="'/history?page=' + (page + 1)"
      class="pagination-next"
    >
      Next page
    </router-link>
    <a v-else class="pagination-next" disabled>
      Next page
    </a>

    <ul class="pagination-list">
      <li>
        <router-link
          to="/history?page=1"
          class="pagination-link"
          :class="{
            'is-current': page === 1
          }"
          aria-label="Goto page 1"
        >
          1
        </router-link>
      </li>

      <li v-if="pagesLength > 1 && page < 4">
        <router-link
          to="/history?page=2"
          class="pagination-link"
          :class="{
            'is-current': page === 2
          }"
          aria-label="Goto page 1"
        >
          2
        </router-link>
      </li>

      <li v-if="pagesLength > 2 && page < 4">
        <router-link
          to="/history?page=3"
          class="pagination-link"
          :class="{
            'is-current': page === 3
          }"
          aria-label="Goto page 1"
        >
          3
        </router-link>
      </li>

      <li v-if="pagesLength > 3 && page > 3">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>

      <li v-if="pagesLength > 3 && page > 3">
        <router-link
          :to="'/history?page=' + (page - 1)"
          class="pagination-link"
          aria-label="Goto page 45"
        >
          {{ page - 1 }}
        </router-link>
      </li>

      <li v-if="pagesLength > 3 && page > 3">
        <router-link
          :to="'/history?page=' + (page)"
          class="pagination-link is-current"
          aria-label="Page 46"
          aria-current="page"
        >
          {{ page }}
        </router-link>
      </li>

      <li v-if="pagesLength > 3 && page > 3 && page < pagesLength">
        <router-link
          :to="'/history?page=' + (page + 1)"
          class="pagination-link"
          aria-label="Goto page 47"
        >
          {{ page + 1 }}
        </router-link>
      </li>

      <li v-if="pagesLength - page > 2">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>

      <li>
        <router-link
          v-if="pagesLength - page > 1"
          :to="'/history?page=' + (pagesLength)"
          class="pagination-link"
          aria-label="Goto page 86"
        >
          {{ pagesLength}}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script></script>
