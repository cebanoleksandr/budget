<script>
import { updateCategory } from '@/api/category'

export default {
  data: () => ({
    select: '',
    title: '',
    limit: '',
    titleError: '',
    limitError: '',
    selectError: '',
  }),
  computed: {
    categories() {
      return this.$store.getters.getCategories
    }
  },
  methods: {
    changeTitle(e) {
      this.title = e.target.value
      this.validateTitle()
    },
    changeLimit(e) {
      this.limit = e.target.value
      this.validateLimit()
    },
    changeSelect(e) {
      this.select = e.target.value
      const category = this.categories.find(c => c.id === this.select)

      if (!!category) {
        this.title = category.title
        this.limit = category.limit
      }

      this.validateSelect()
      this.validateTitle()
      this.validateLimit()
    },
    validateTitle() {
      if (!this.title) {
        this.titleError = 'Title is require'
      } else {
        this.titleError = ''
      }
    },
    validateSelect() {
      if (!this.select) {
        this.selectError = 'You must choose the category'
      } else {
        this.selectError = ''
      }
    },
    validateLimit() {
      const pattern = /^[1-9][0-9]*$/

      if (!this.limit) {
        this.limitError = 'Name is require'
      } else if (!pattern.test(this.limit)) {
        this.limitError = 'It must be a number'
      } else if (+this.limit < 100) {
        this.limitError = 'Minimum value must be 100'
      } else {
        this.limitError = ''
      }
    },
    reset() {
      this.title = ''
      this.limit = ''
      this.select = ''
      this.titleError = ''
      this.limitError = ''
      this.selectError = ''
    },
    submitHandler() {
      this.validateTitle()
      this.validateLimit()
      this.validateSelect()

      if (!!this.titleError || !!this.limitError || !!this.selectError) {
        return
      }

      const categoryData = {
        title: this.title,
        limit: this.limit,
      }

      updateCategory(this.select, categoryData)
        .then((res) => {
          console.log('Updated', res.data);
          this.$store.commit('updateCategories', res.data)
          this.$store.commit('setMessage', 'Category is updated successfuly')

          setTimeout(() => {
            this.$store.commit('clearMessage')
          }, 3000);
        })
        .finally(() => {
          this.reset()
        })
    }
  }
}
</script>

<template>
  <div class="column is-6">
    <h3 class="is-size-3">Edit</h3>
    <form @submit.prevent="submitHandler">
      <div class="field">
        <label class="label">Title</label>
        <div
          class="select is-primary"
          :class="{
            'is-danger': !!selectError
          }"
        >
          <select :value="select" @input="changeSelect">
            <option disabled value="">Select category title</option>
            <option
              v-for="category of categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </div>
        <p class="help has-text-danger fix-height">{{ selectError }}</p>
      </div>

      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input
            class="input is-primary"
            :class="{
              'is-danger': !!titleError
            }"
            type="text"
            placeholder="Name..."
            :value="title"
            @input="changeTitle"
            @blur="validateTitle()"
          />
        </div>
        <p class="help has-text-danger fix-height">{{ titleError }}</p>
      </div>

      <div class="field">
        <label class="label">Limit</label>
        <div class="control">
          <input
            class="input is-primary"
            :class="{
              'is-danger': !!limitError
            }"
            type="text"
            placeholder="Minimum value..."
            :value="limit"
            @input="changeLimit"
            @blur="validateLimit()"
          />
        </div>
        <p class="help has-text-danger fix-height">{{ limitError }}</p>
      </div>

      <div class="control">
        <button class="button is-success">
          Refresh
          &nbsp;
          <i class="fa fa-paper-plane"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<style>
.fix-height {
  height: 20px;
}
</style>
