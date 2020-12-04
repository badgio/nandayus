<template>
    <div
        class="card"
    >
        <h1>
            {{language.pageTitle[this.selected_language]}}
        </h1>
        <br>
        <label
            for="username"
        >
            {{language.username[this.selected_language]}}
        </label>
        <input
            class="inputClass"
            type="text"
            name="username"
            value="Valor"
        >
        <label
            for="password"
        >
            {{language.password[this.selected_language]}}
        </label>
        <input
            class="inputClass"
            :type="show_password"
            name="password"
            value="1234"
        >
        <div
            class="passwordCheckbox"
        >
            <label
                for="showPasswordCheckbox"
            >
                <input
                    type="checkbox"
                    name="showPasswordCheckbox"
                    v-model="showPassword"
                >
                {{language.showPassword[this.selected_language]}}
            </label>
        </div>
        <div
            class="buttonRow"
        >
            <input
                class="submit_button"
                type="button"
                :value="this.language.submit[selected_language]"
                v-on:click="sendMessage()"
            >
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Profile',
        computed: {
            selected_language() {
                return this.$store.getters.getLanguage;
            },
            show_password() {
                if (this.showPassword) return "text";
                else return "password";
            }
        },
        data: () => {
            return {
                language: {
                    pageTitle: {
                        en: 'Profile',
                        pt: 'Perfil',
                    },
                    username: {
                        en: 'Username',
                        pt: 'Nome de Utilizador',
                    },
                    password: {
                        en: 'Password',
                        pt: 'Palavra-Passe',
                    },
                    showPassword: {
                        en: 'Show Password',
                        pt: 'Mostrar Palavra-Passe',
                    },
                    submit: {
                        en: 'Submit Changes',
                        pt: 'Submeter Alterações',
                    },
                },
                showPassword: false,
            }
        }    
    }
</script>

<style scoped>

* {
    color: #444444;
}

h1 {
  padding : 25px;
  margin : auto;
  text-align : center;
}

p {
    font-size: 11px;
}

.inputClass {
  width: 90%;
  margin: 5px 5% 15px 5%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

label {
    margin-left: 5%;
}

.card {
    width: 90%;
    margin: 25px auto 25px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #b3b3b3;
    text-align: left;
    padding: 20px;
}

.passwordCheckbox > label {
    max-width: 90%;
    margin: 0px 5% 15px 5%;
    font-size: 17px;
    padding: 10px;
    display:block; 
}

.passwordCheckbox > input {
    margin-left: 5%;
    height: 5px;
}

.buttonRow {
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
    clear: both;
}

.submit_button {
    float: right;
    background-color: #4CAF50;
    color: white;
    margin: 5px 0px;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.submit_button:hover {
  background-color: #45a049;
}

</style>