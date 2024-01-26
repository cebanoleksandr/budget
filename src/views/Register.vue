<script>
import { registerAPI } from '@/api/auth';
import { createBillAPI } from '@/api/bill';
import { getCategoriesAPI } from '@/api/category'
import { getRecordsAPI } from '@/api/record';

export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
    emailError: '',
    passwordError: '',
    nameError: '',
    agreeError: ''
  }),
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  methods: {
    generateEmailError(email) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        return 'Email is required'
      } else 
      if (!pattern.test(email)) {
        return 'Incorrect email'
      } else {
        return ''
      }
    },
    generatePasswordError(password) {
      if (!password) {
        return 'Password is required'
      } else if (password.length < 6) {
        return 'Password must have at least 6 characters'
      } else {
        return ''
      }
    },
    generateNameError(name) {
      return !!name.trim() ? '' : 'Name is require'
    },
    submitHandler() {
      this.emailError = this.generateEmailError(this.email)
      this.passwordError = this.generatePasswordError(this.password)
      this.nameError = this.generateNameError(this.name)
      this.agreeError = !this.agree ? 'You should agree to the rules' : ''

      if (
        !!this.emailError
        || !!this.passwordError
        || !!this.nameError
        || !!this.agreeError
      ) {
        return
      }

      registerAPI(this.email, this.password, this.name)
        .then(res => {
          console.log(res.data);
          if (typeof res.data === 'string') {
            this.$store.commit('setError', res.data)
          } else {
            localStorage.setItem('currentUser', JSON.stringify(res.data));
            this.$store.commit('setUser', res.data)
            createBillAPI(res.data.id, 15000)
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
          }
        })
        .then(() => {
          if (!this.$store.getters.error) {
            this.$router.push('/')
          }
        })
        .catch(e => {
          throw new Error(e)
        })
        .finally(() => {
          setTimeout(() => {
            this.$store.commit('clearError')
          }, 3000);
        })
    },
    changeEmail(e) {
      if (!!this.emailError) {
        this.emailError = this.generateEmailError(e.target.value)
      }

      this.email = e.target.value
    },
    changePassword(e) {
      if (!!this.passwordError) {
        this.passwordError = this.generatePasswordError(e.target.value)
      }

      this.password = e.target.value
    },
    changeName(e) {
      if (!!this.nameError) {
        this.nameError = this.generateNameError(e.target.value)
      }

      this.name = e.target.value
    },
    changeAgree(e) {
      if (!!this.agreeError) {
        this.agreeError = !this.agree ? 'You should agree to the rules' : ''
      }

      this.agree = e.target.value
    }
  }
}
</script>

<template>
  <form
    class="login-form"
    novalidate
    @submit.prevent="submitHandler"
  >
    <h2 class="is-size-2 has-text-centered mb-4">
      Registration
    </h2>

    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input
          type="text"
          class="input"
          :class="{
            'is-danger': nameError
          }"
          :value="name"
          @input="changeName"
          placeholder="Name..."
        >
      </div>
      <div class="error-container">
        <small class="has-text-danger">{{ nameError }}</small>
      </div>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          type="email"
          class="input"
          :class="{
            'is-danger': emailError
          }"
          :value="email"
          @input="changeEmail"
          placeholder="Email..."
        >
      </div>
      <div class="error-container">
        <small class="has-text-danger">{{ emailError }}</small>
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input
          type="password"
          class="input"
          :class="{
            'is-danger': passwordError
          }"
          :value="password"
          @input="changePassword"
          placeholder="Password..."
        >
      </div>
      <div class="error-container">
        <small class="has-text-danger">{{ passwordError }}</small>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input
            type="checkbox"
            :value="agree"
            @input="changeAgree"
          >
          I agree to the rules
        </label>
      </div>
      <div class="error-container">
        <small class="has-text-danger">{{ agreeError }}</small>
      </div>
    </div>

    <div class="mt-6 has-text-centered">
      <button class="button is-primary is-rounded">Sign Un</button>
    </div>

    <p class="has-text-centered mt-4">
      Do you have an account? 
      <router-link to="/login">Login</router-link>
    </p>
  </form>

  <div
    v-if="!!error"
    class="notification absolute is-danger"
  >
    <button class="delete"></button>
    <strong>{{ error }}</strong>
  </div>
</template>

<style>
.login-form {
  width: 80%;
  max-width: 500px;
  margin: 0 auto;
}
.error-container {
  height: 15px;
}
.absolute {
  position: absolute;
  top: 40px;
  right: 40px;
}
</style>
