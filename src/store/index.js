import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    language: 'pt',
    user: {
      loggedIn: false,
      data: null
    }
  },
  getters: {
    getLanguage(state) {
      return state.language;
    },
    user(state){
      return state.user;
    }
  },
  mutations: {
    changeLanguageMutation:(state, language) =>  {
      state.language = language;
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    }
  },
  actions: {
    changeLanguageAction({commit}, lang) {
      // action that calls changeLanguageMutation which changes the language in which the site is displayed
      commit('changeLanguageMutation', lang);
    },
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          // displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    }
  }
});
