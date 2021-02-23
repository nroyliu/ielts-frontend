import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    task: []
  },
  mutations: {
    setTask(state, task) {
      state.task = task
    }
  },
  actions: {}
});