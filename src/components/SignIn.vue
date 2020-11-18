<template>
  <div 
    class="login-box"
  >
    <h2>
      {{language.pageTitle[selected_language]}}
    </h2>

    <form
      @submit.prevent="submit"
    >
      <div
        class="user-box"
      >
        <input
          type="text"
          name="email"
          required=""
          v-model="form.email"
        >
        <label>
          {{language.email[selected_language]}}
        </label>
      </div>
      <div
        class="user-box"
      >
        <input
          type="password"
          name="password"
          required=""
          v-model="form.password"
        >
        <label>
          {{language.password[selected_language]}}
        </label>
      </div>
      <div>
        <button
          class="submit_button"
        >
          {{language.pageTitle[selected_language]}}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      language: {
        pageTitle: {
          en: 'Login',
          pt: 'Iniciar Sessão',
        },
        email: {
          en: 'Email Address',
          pt: 'Endereço de Email',
        },
        password: {
          en: 'Password',
          pt: 'Palavra-Passe',
        },
      },
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  computed: {
    selected_language() {
      return this.$store.getters.getLanguage;
    },
  },
  methods: {
    submit() {
      console.log("signiinnnn")
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          this.$router.replace({ name: "Home" });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
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