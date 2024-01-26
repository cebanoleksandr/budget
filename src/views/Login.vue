<script>
import { loginAPI } from '@/api/auth';
import { getBillAPI } from '@/api/bill';
import { getCategoriesAPI } from '@/api/category'
import { getRecordsAPI } from '@/api/record';

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    notificationType: '',
    notificationText: ''
  }),
  mounted() {
    if (this.$route.query.message === 'logout') {
      this.notificationType = 'is-danger'
      this.notificationText = 'You logged out'

      setTimeout(() => {
        this.notificationType = ''
        this.notificationText = ''
      }, 3000);
    }
  },
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
    submitHandler() {
      this.emailError = this.generateEmailError(this.email)
      this.passwordError = this.generatePasswordError(this.password)

      if (!!this.emailError || !!this.passwordError) {
        return
      }

      loginAPI(this.email, this.password)
        .then((res) => {
          if (typeof res.data === 'string') {
            this.$store.commit('setError', res.data)
          } else {
            localStorage.setItem('currentUser', JSON.stringify(res.data));
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
          }
        })
        .then(() => {
          if (!this.$store.getters.error) {
            this.$router.push('/')
          }
        })
        .catch((e) => {
          console.log(e)
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
      Home Budget
    </h2>

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

    <div class="mt-6 has-text-centered">
      <button class="button is-success is-rounded">Sign In</button>
    </div>

    <p class="has-text-centered mt-4">
      No account?
      <router-link to="/register">Register</router-link>
    </p>
  </form>

  <div
    v-if="!!notificationText"
    class="notification absolute"
    :class="notificationType"
  >
    <button class="delete"></button>
    <strong>{{ notificationText }}</strong>
  </div>
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
