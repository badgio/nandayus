import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    language: 'pt',
    user: {
      loggedIn: false,
      data: null,
      idToken: '',
    }
  },
  getters: {
    getLanguage(state) {
      return state.language;
    },
    user(state){
      return state.user;
    },
    getToken(state) {
      return state.user.idToken;
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
    },
    SET_TOKEN(state, value) {
      state.user.idToken = value; 
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
          loggedIn: true,
          email: user.email,
        });
      } else {
        console.log('user is not true')
        commit("SET_USER", {
          loggedIn: false,
          email: '',
        });
      }
    },
    setToken({commit}, value) {
      commit('SET_TOKEN', value);
    }
  }
});
