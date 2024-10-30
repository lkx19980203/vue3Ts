import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 100
  }),
  getters: {
    doubleCounter(state) {
      return state.count * 2
    }
  },
  actions: {
    changeCounter(newCounter: number) {
      this.count = newCounter
    }
  }
})

export default useCounterStore
