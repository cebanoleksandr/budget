<script>
import { updateUserAPI } from '@/api/auth.js'

export default {
  data: () => ({
    name: '',
    nameError: ''
  }),
  mounted() {
    this.name = this.$store.getters.user.name
  },
  methods: {
    changeNameHandler(e) {
      this.name = e.target.value
      this.validateName()
    },
    validateName() {
      if (!this.name) {
        this.nameError = 'Name is require'
      } else {
        this.nameError = ''
      }
    },
    submitHandler() {
      this.validateName()

      if (!!this.nameError) {
        return
      }

      updateUserAPI(this.$store.getters.user.id, this.name)
        .then(res => {
          if (typeof res.data === 'string') {
            this.$store.commit('setError', res.data)
          } else {
            localStorage.setItem('currentUser', JSON.stringify(res.data));
            this.$store.commit('setUser', res.data)
          }
        })
        .catch(e => {})
        .finally(() => {
          setTimeout(() => {
            this.$store.commit('clearError')
          }, 3000);
        })
    }
  }
}
</script>

<template>
  <h2 class="is-size-2 mb-2">Profile</h2>

  <div class="hr"></div>

  <form class="edit-profile mt-4 px-3 py-3" @submit.prevent="submitHandler">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input
          class="input is-primary"
          :class="{
            'is-danger': !!nameError
          }"
          type="text"
          placeholder="Name..."
          :value="name"
          @input="changeNameHandler"
          @blur="validateName"
        >
      </div>
      <p class="help has-text-danger err-height">
        {{ nameError }}
      </p>
    </div>

    <div class="control mt-4">
      <button class="button is-success">
        Refresh
        &nbsp;
        <i class="fa fa-paper-plane"></i>
      </button>
    </div>
  </form>
</template>

<style>
.hr {
  height: 1px;
  width: 100%;
  background-color: hsl(0, 0%, 71%);
}
.err-height {
  height: 15px;
}
.edit-profile {
  max-width: 500px;
}
</style>
