<script>
import { updateBillAPI } from '@/api/bill'
import { createRecordAPI, getRecordsAPI } from '@/api/record.js'

export default {
  name: 'record',
  data: () => ({
    select: '',
    type: 'outcome',
    amount: '',
    description: '',
    selectError: '',
    amountError: '',
    descriptionError: ''
  }),
  computed: {
    categories() {
      return this.$store.getters.getCategories
    },
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }

      return this.$store.getters.bill?.bill >= +this.amount
    },
    error() {
      return this.$store.getters.error
    },
    message() {
      return this.$store.getters.message
    }
  },
  methods: {
    changeSelect(e) {
      this.select = e.target.value
      this.validateSelect()
    },
    changeType(type) {
      this.type = type
    },
    changeAmount(e) {
      this.amount = e.target.value
      this.validateAmount()
    },
    changeDescription(e) {
      this.description = e.target.value
      this.validateDescription()
    },
    validateSelect() {
      if (!this.select) {
        this.selectError = 'You must choose the category'
      } else {
        this.selectError = ''
      }
    },
    validateAmount() {
      const pattern = /^[1-9][0-9]*$/

      if (!this.amount) {
        this.amountError = 'Amount is require'
      } else if (!pattern.test(this.amount)) {
        this.amountError = 'It must be a number'
      }  else {
        this.amountError = ''
      }
    },
    validateDescription() {
      if (!this.description) {
        this.descriptionError = 'Description is require'
      } else {
        this.descriptionError = ''
      }
    },
    reset() {
      this.select = ''
      this.type = 'outcome'
      this.amount = ''
      this.description = ''
      this.selectError = ''
      this.amountError = ''
      this.descriptionError = ''
    },
    submitHandler() {
      this.validateAmount()
      this.validateDescription()
      this.validateSelect()

      if (!!this.selectError || !!this.amountError || !!this.descriptionError) {
        return
      }

      if (this.canCreateRecord) {
        const newRecord = {
          categoryId: this.select,
          userId: this.$store.getters.user?.id,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date()
        }

        createRecordAPI(newRecord)
          .then(res => {
            const bill = this.type === 'income'
              ? +this.amount
              : 0 - +this.amount
            updateBillAPI(this.$store.getters.user?.id, bill)
              .then(res => {
                this.$store.commit('setBill', res.data)
                this.$store.commit('setMessage', 'Record is created successfully')
                this.reset()

                setTimeout(() => {
                  this.$store.commit('clearMessage')
                }, 3000);
              })
            getRecordsAPI(this.$store.getters.user?.id)
              .then(res => {
                this.$store.commit('setRecords', res.data)
              })
          })
          .catch((e) => {})
      } else {
        this.$store.commit(
          'setError',
          `Not enough money in the account (-${+this.amount - this.$store.getters.bill.bill})`
        )
        setTimeout(() => {
          this.$store.commit('clearError')
        }, 3000);
      }
    }
  }
}
</script>

<template>
  <h2 class="is-size-2 mb-2">New Record</h2>

  <div class="hr"></div>

  <h3 v-if="!categories.length" class="is-size-3 has-text-centered w100 mt-6">
    There are no categories. &nbsp;
    <router-link to="/categories">Add category</router-link>
  </h3>

  <form
    v-else
    class="mt-2 max-width-500 center"
    @submit.prevent="submitHandler"
  >
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
      <p class="help has-text-danger err-height">{{ selectError }}</p>
    </div>

    <div class="control mb-3">
      <label class="radio" @click="changeType('income')">
        <input
          type="radio"
          value="income"
          v-model="type"
        >
        Income
      </label>
      <label class="radio" @click="changeType('outcome')">
        <input
          type="radio"
          value="outcome"
          v-model="type"
        >
        Outcome
      </label>
    </div>

    <div class="field">
      <label class="label">Amount</label>
      <div class="control">
        <input
          class="input is-primary"
          :class="{
            'is-danger': !!amountError
          }"
          type="text"
          placeholder="Amount..."
          :value="amount"
          @input="changeAmount"
          @blur="validateAmount()"
        />
      </div>
      <p class="help has-text-danger err-height">{{ amountError }}</p>
    </div>

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea
          class="textarea is-primary"
          :class="{
            'is-danger': !!descriptionError
          }"
          type="text"
          placeholder="Description..."
          :value="description"
          @input="changeDescription"
          @blur="validateDescription()"
        ></textarea>
      </div>
      <p class="help has-text-danger err-height">{{ descriptionError }}</p>
    </div>

    <div class="control">
      <button class="button is-success">
        Create
        &nbsp;
        <i class="fa fa-paper-plane"></i>
      </button>
    </div>
  </form>

  <div
    v-if="!!error"
    class="notification absolute is-danger"
  >
    <button class="delete"></button>
    <strong>{{ error }}</strong>
  </div>
  <div v-if="!!message" class="notification absolute is-success">
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
.center {
  margin: 0 auto;
}
.err-height {
  height: 15px;
}
.absolute {
  position: absolute;
  top: 40px;
  right: 40px;
}
</style>

