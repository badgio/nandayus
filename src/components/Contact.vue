<template>
    <div>
        <div
            class="card contact"
        >
            <h3>
                {{language.contact_us[this.selected_language]}}
            </h3>
            <hr>
            <br>
            <form
                action=""
            >
                <label
                    for="about"
                >
                    {{language.about[this.selected_language]}}*
                </label>
                <select
                    name="about"
                    id="about"
                    v-model="values.about"
                    required
                >
                    <option
                        selected
                        disabled
                        value=""
                    >
                        {{language.about_default[this.selected_language]}}
                    </option>
                    <option
                        v-for="theme in about"
                        :key="theme.index"
                        :value="theme['en']"
                    >
                        {{theme[selected_language]}}
                    </option>
                </select>
                <br>
                <br>
                <label
                    for="email_field"
                >
                    {{language.email[selected_language]}}*
                </label>
                <input
                    id="email_field"
                    type="text"
                    required
                    v-model="values.email"
                >
                <br>
                <br>
                <label
                    for="description"
                >
                    {{language.description[selected_language]}}*
                </label>
                <br>
                <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                    v-model="values.message"
                    required
                >
                </textarea>
                <br>
                <br>
                <input
                    class="submit_button"
                    type="button"
                    :value="this.language.submit[selected_language]"
                    v-on:click="sendMessage()"
                >
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ContactForm',
        computed: {
            selected_language() {
                return this.$store.getters.getLanguage;
            },
        },
        data: () => {
            return {
                language: {
                    contact_us: {
                        en: 'Contact Us!',
                        pt: 'Contacte-nos!',
                    },
                    about: {
                        en: 'What is the contact about',
                        pt: 'Tema do Contato',
                    },
                    about_default: {
                        en: 'Choose a Subject',
                        pt: 'Escolha um Assunto',
                    },
                    email: {
                        en: 'Your Email',
                        pt: 'O seu Email',
                    },
                    description: {
                        en: 'Message',
                        pt: 'Mensagem'
                    },
                    submit: {
                        en: 'Send message',
                        pt: 'Enviar mensagem',
                    }
                },
                values: {
                    about: '',
                    email: '',
                    message: '',
                },
                about: [
                    {
                        en: 'General',
                        pt: 'Geral',
                    },
                    {
                        en: 'Agreements & Contracts',
                        pt: 'Acordos e Contratos',
                    }
                ],
            }
        },
        methods: {
            sendMessage() {
                console.log('about: ', this.values.about, '\nemail: ', this.values.email, '\nmessage: ', this.values.message);
            }
        }
    }
</script>

<style scoped>

.card {
    width: 90%;
    margin: 0 auto;
    border-radius: 5px;
    border: 1px solid #b3b3b3;
    text-align: center;
    padding: 20px;
}

/**/

input[type=text], select, textarea {
  width: 90%;
  margin: 5px auto 5px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

.submit_button {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit_button:hover {
  background-color: #45a049;
}

</style>