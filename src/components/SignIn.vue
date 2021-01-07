<template>
  <div class="login-box">
    <h2>
      {{ language.pageTitle[selected_language] }}
    </h2>

    <form @submit.prevent="submit">
      <div class="user-box">
        <input type="text" name="email" required="" v-model="form.email" />
        <label>
          {{ language.email[selected_language] }}
        </label>
      </div>
      <div class="user-box">
        <input
          type="password"
          name="password"
          required=""
          v-model="form.password"
        />
        <label>
          {{ language.password[selected_language] }}
        </label>
      </div>
      <div>
        <button class="submit_button">
          {{ language.pageTitle[selected_language] }}
        </button>
      </div>
      <div
        class="alert failure"
        v-if="error_banner"
        v-on:click="error_banner = false"
      >
        <strong>
          {{ language.failure_form.title[this.selected_language] }}
        </strong>
        {{ language.failure_form.text[this.selected_language] }}
        <br />
        {{ language.form_dismissal[this.selected_language] }}
      </div>
    </form>
  </div>
</template>

<script>

import axios from 'axios';
import firebase from "firebase";
import store from "../store/index.js";

export default {
  /*
      Global Awareness:
          1. name
  */
  name: "signin",
  /*
      Template Modifiers:
          1. delimiters
  */
  /*
      Template Dependencies:
          1. components
          2. directives
  */
  /*
      Composition:
          1. extends
          2. mixin
          3. provide / inject
  */
  /*
      Interface:
          1. inheritAttrs
          2. props
          3. emits
  */
  /*
      Composition API:
          1. setup
  */
  /*
      Local State
          1. data
          2. computed
  */
  data() {
    return {
      language: {
        failure_form: {
          title: {
            en: "Failure",
            pt: "Erro",
          },
          text: {
            en: "Incorrect email or password! Please try again!",
            pt: "Email ou palavra-passe incorretos! Por favor tente de novo!",
          },
        },
        form_dismissal: {
          en: "Click anywhere on the warning to dismiss it.",
          pt: "Clique no aviso para o remover.",
        },
        pageTitle: {
          en: "Login",
          pt: "Iniciar Sessão",
        },
        email: {
          en: "Email Address",
          pt: "Endereço de Email",
        },
        password: {
          en: "Password",
          pt: "Palavra-Passe",
        },
      },
      form: {
        email: "",
        password: "",
      },
      error_banner: false,
      error: null,
    };
  },
  computed: {
    selected_language() {
      return store.getters.getLanguage;
    },
  },
  /*
      Events:
          1. watch
      
      &

      Lifecycle Events ( by the order in which they are called ):
          1. beforeCreate
          2. created
          3. beforeMount
          4. mounted
          5. beforeUpdate
          6. updated
          7. activated
          8. deactivated
          9. beforeUnmount
          10. unmounted
          11. errorCaptured
          12. renderTracked
          13. renderTriggered
  */
  /*
  Reactive Properties:
      1. methods
  */
  methods: {
    async submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          firebase
          .auth()
          .currentUser
          .getIdToken(true)
          .then(async (idToken) => {
              console.log("Id Token", idToken);
              store.dispatch('setToken', idToken);
              await axios
                      .get('http://localhost:8001/v0/users/profile', {
                              headers: {
                                  'Access-Control-Allow-Origin': '*',
                                  'Content-type': 'application/json',
                                  authorization: 'Bearer ' + idToken
                              },
                          }
                      )
                      .then((res) => {
                              if (res.data.manager_info && res.data.promoter_info) {
                                store.dispatch('setRole', 'promoter and manager');
                                this.$router.replace({ name: "badges" });
                              }
                              else {
                                if (res.data.manager_info) {
                                  // user is a manager
                                  store.dispatch('setRole', 'manager');
                                  this.$router.replace({ name: "locations" });
                                }
                                else if(res.data.promoter_info) {
                                  // user is a promoter
                                  store.dispatch('setRole', 'promoter');
                                  this.$router.replace({ name: "badges" });
                                }
                                else {
                                  // user is an admin
                                  store.dispatch('setRole', 'admin');
                                  this.$router.replace({ name: "badges" });
                                }
                              }
                          }
                      )
                      .catch((err) => {
                              console.error(err)
                          }
                      );
            }
          )
          .catch(err1 => {
            console.error(err1);
          });
        })
        .catch((err2) => {
          console.error(err2);
          this.error_banner = true;
        });
    },
  },
  /*
      Rendering:
          1. template / render
  */
};
</script>

<style scoped>
html {
  height: 100%;
}

.login-box {
  position: absolute;
  top: 30%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #0a4870;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #0a4870;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #0a4870;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #0a4870;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.submit_button {
  border: 1px solid #0a4870;
  border-radius: 5px;
  background-color: #f0f8ff;
  color: #0a4870;
  text-decoration: none;
  font-size: 16px;
  width: 175px;
  height: 50px;
  margin: 10px auto 20px;
  cursor: pointer;
  text-align: center;
}
.alert {
  padding: 10px 5px;
  margin: 0px auto;
  border-radius: 8px;
  font-size: 14px;
  color: #333333;
}

.failure {
  border: 1px solid #cb4444;
  background-color: #d47575;
}

.failure:hover {
  background-color: #b04c4c;
  transition: 0.3s;
}
.submit_button {
  border: 1px solid #0a4870;
  border-radius: 5px;
  background-color: #f0f8ff;
  color: #0a4870;
  text-decoration: none;
  font-size: 16px;
  width: 175px;
  height: 50px;
  margin: 10px auto 20px;
  cursor: pointer;
  text-align: center;
}
</style>