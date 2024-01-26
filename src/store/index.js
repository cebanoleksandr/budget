import { createStore } from 'vuex'
import auth from './auth'

const store = createStore({
  state: {
    error: null,
    user: null,
    bill: null,
    categories: [],
    records: [],
    message: ''
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
    setUser(state, user) {
      state.user = user
    },
    setBill(state, bill) {
      state.bill = bill
    },
    clearUser(state) {
      state.user = null
      state.bill = null
      state.categories = []
      state.records = []
    },
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = ''
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    addCategory(state, category) {
      state.categories.push(category)
    },
    updateCategories(state, category) {
      state.categories = state.categories.map(c => {
        if (c.id === category?.id) {
          return category;
        }

        return c;
      })
    },
    setRecords(state, records) {
      state.records = records
    }
  },
  getters: {
    error(state) {
      return state.error
    },
    user(state) {
      return state.user
    },
    bill(state) {
      return state.bill
    },
    message(state) {
      return state.message
    },
    getCategories(state) {
      return state.categories
    },
    getRecords(state) {
      return state.records
    }
  },
  modules: {
    auth
  }
})

export default store
