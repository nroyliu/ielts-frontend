import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    task: [],
    writeContent:{},
    isPlay: false
  },
  mutations: {
    setTask(state, task) {
      state.task = task
    },
    setWriteContent(state,txt){
      state.writeContent = txt
    },
    setTestAudio(state,payload){
      state.isPlay = payload
    }
  },
  actions: {}
});