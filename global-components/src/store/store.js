import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: undefined,
  },
  getters: {
    GET_USER_ID(state) {
      return state.userId;
    },
  },
  mutations: {
    SET_USER_ID(state, newUserId) {
      state.userId = newUserId;
    },
  },
  actions: {
    changeUserId(context, newUserId) {
      context.commit('SET_USER_ID', newUserId);
    },
  },
  modules: {}
})

// export default Store;