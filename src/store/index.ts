import { Result } from '@/interfaces';
import { createStore } from 'vuex';

export default createStore({
  state: {
    results: [] as Result[],
  },
  mutations: {
    addResult(state, payload: Result) {
      state.results.push(payload);
    },
  },
  getters: {
    getResults(state) {
      return state.results;
    },
  },
});
