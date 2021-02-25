import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    task: [],
    writeContent:{}
  },
  mutations: {
    setTask(state, task) {
      state.task = task
    },
    setWriteContent(state,txt){
      state.writeContent = txt
    }
  },
  actions: {}
});