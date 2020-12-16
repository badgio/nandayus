<template>
    <div>
        <div
            class="card contact"
        >
            <h3
                class="pageTitle"
            >
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
                <br>
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
                <br>
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
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        /*
            Global Awareness:
                1. name
        */
        name: 'ContactForm',
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
        data: () => {
            return {
                language: {
                    contact_us: {
                        en: 'Contact Us!',
                        pt: 'Contacte-nos!',
                    },
                    about: {
                        en: 'What is the contact about',
                        pt: 'Razão do Contato',
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
            sendMessage() {
                console.log('about: ', this.values.about, '\nemail: ', this.values.email, '\nmessage: ', this.values.message);
            }
        }
        /*
            Rendering:
                1. template / render
        */
    }
</script>

<style scoped>

.card {
    width: 90%;
    margin: 0 auto;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #b3b3b3;
    text-align: left;
    padding: 20px;
}

.pageTitle {
    text-align: center;
}

input[type=text], select, textarea {
  width: 90%;
  margin: 5px 5% 5px 5%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

label {
    margin-left: 5%;
}

.buttonRow {
    width: 100%;
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