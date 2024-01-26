<script>
import { createCategory } from '@/api/category.js'
export default {
  data: () => ({
    title: '',
    limit: '',
    titleError: '',
    limitError: '',
  }),
  methods: {
    changeTitle(e) {
      this.title = e.target.value
      this.validateTitle()
    },
    changeLimit(e) {
      this.limit = e.target.value
      this.validateLimit()
    },
    validateTitle() {
      if (!this.title) {
        this.titleError = 'Title is require'
      } else {
        this.titleError = ''
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
      this.titleError = ''
      this.limitError = ''
    },
    submitHandler() {
      this.validateTitle()
      this.validateLimit()

      if (!!this.titleError || !!this.limitError) {
        return
      }

      const category = {
        title: this.title,
        limit: this.limit,
      }

      createCategory(this.$store.getters.user.id, category)
        .then((res) => {
          console.log(res.data)
          this.$store.commit('addCategory', res.data)
          this.$store.commit('setMessage', 'Category is created successfuly')

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
    <h3 class="is-size-3">Create</h3>
    <form @submit.prevent="submitHandler">
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
          Create
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
