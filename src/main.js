import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from "firebase";

Vue.config.productionTip = false

const configOptions = {
  apiKey: "AIzaSyBCPux6bMmsC7pSzWxQx4Cww06zLisdVSA",
  authDomain: "badgio-f2524.firebaseapp.com",
  databaseURL: "https://badgio-f2524.firebaseio.com",
  projectId: "badgio-f2524",
  storageBucket: "badgio-f2524.appspot.com",
  messagingSenderId: "127892155972",
  appId: "1:127892155972:web:b6d79a88e23574189a5611",
  measurementId: "G-446V7S4PMT"
};

export default firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
