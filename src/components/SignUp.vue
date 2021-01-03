<template>
  <div class="login-box">
    <h2>{{language.pageTitle[selected_language]}}</h2>
    <form @submit.prevent="submitForm">
      <div class="user-box">
        <input type="text" name="email" required="" v-model="form.email">
        <label>{{language.email[selected_language]}}</label>
      </div>
      <div class="user-box">
        <input type="password" name="password" required="" v-model="form.password">
        <label>{{language.password[selected_language]}}</label>
      </div>
      <div class="user-box">
        <input type="radio" name="manager" value="manager" v-model="form.user_type" >
        <label>Manager</label>
      </div>
       <div class="user-box">
        <input type="radio" name="promoter" value="promoter" v-model="form.user_type" >
        <label>Promoter</label>
      </div>
      <div>
        <button
          class="submit_button"
        >
          {{language.pageTitle[selected_language]}}
        </button>
      </div>
      <div
          class="alert failure"
          v-if="error_banner"
          v-on:click="error_banner=false;"
      >
          <strong>
              {{language.failure_form.title[this.selected_language]}}
          </strong>
          {{language.failure_form.text[this.selected_language]}}
          <br>
          {{language.form_dismissal[this.selected_language]}}
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import store from '../store/index.js';
import axios from 'axios';

export default {
  /*
      Global Awareness:
          1. name
  */
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
        success_form: {
            title: {
                en: 'Success',
                pt: 'Sucesso',
            },
            text: {
                en: 'The information has been successfully submitted!',
                pt: 'A informação foi submetida com sucesso!',
            },
        },
        failure_form: {
            title: {
                en: 'Failure',
                pt: 'Erro',
            },
            text: {
                en: 'The information has not been successfully registed! Please try again!',
                pt: 'A informação não foi registada com sucesso! Por favor tente de novo!',
            },
        },
        form_dismissal: {
            en: 'Click anywhere on the warning to dismiss it.',
            pt: 'Clique no aviso para o remover.'
        },
        pageTitle: {
          en: 'Sign Up',
          pt: 'Registo',
        },
        email: {
          en: 'Email Address',
          pt: 'Endereço de Email',
        },
        password: {
          en: 'Password',
          pt: 'Palavra-Passe',
        },
        user_type: {
          en: 'User type',
          pt: 'Tipo de utilizador',
        },
      },
      form: {
        email: "",
        password: "",
        user_type:"",
      },
      error_banner: false,
      error: null
    };
    
  },
  computed: {
    selected_language() {
      return this.$store.getters.getLanguage;
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
    async submitForm(e) {
                var data = this.form;
                var postLink='';
                console.log(data)

                if (this.form.user_type=="manager") {
                  postLink='http://localhost:8001/v0/users/managers';
                }
                if (this.form.user_type=="promoter") {
                  postLink='http://localhost:8001/v0/users/promoters';
                }

                await axios.post(
                    postLink, 
                    data,
                ).then(
                    response => {
                        console.log('response', response)
                        if (response.status == 201) {
                            this.success_banner = true;
                            firebase
                              .auth()
                              .signInWithEmailAndPassword(this.form.email, this.form.password)
                              .then(data => {
                                console.log("Refresh Token", data.user.refreshToken);
                                firebase
                                .auth()
                                .currentUser
                                .getIdToken(true)
                                .then(idToken => {
                                  console.log("Id Token", idToken);
                                  store.dispatch('setToken', idToken);
                                  this.$router.replace({ name: "home" });
                                })
                                .catch(err1 => {
                                  console.error(err1);
                                  this.error_banner= true;
                                });
                              })
                              .catch(err2 => {
                                console.error(err2);
                                this.error_banner= true;
                              });
                        }  
                    }
                ).catch(
                    error => {
                        console.log(error);
                        this.error_banner= true;
                        this.error= error;
                    }
                )

                window.scrollTo(0,0);
            }
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
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #0a4870;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
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
    background-color: #F0F8FF;
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