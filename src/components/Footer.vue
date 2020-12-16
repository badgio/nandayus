<template>
    <div>
        <footer>
            <br>
            <div
                class="row"
            >
                Badgio &#169; 2020
            </div>
            <br>
            <label
                for="languageSelector"
            >
                {{language.select_language[selected_language]}}
            </label>
            <select
                name="languageSelector"
                id="languageSelector"
                v-model="selected_language"
                v-on:change="changeLanguage"
            >
                <option
                    v-for="language in languages" 
                    :key="language.index"
                    :value="language.abbreviation"
                    :selected="language.selected"
                >
                    {{language.name}}
                </option>
            </select>
            <br>
            <div
                class="row"
            >
                <router-link
                    class="contact_link"
                    to="/contact-us"
                >
                    Contact us via our form!
                </router-link>
            </div>
            <div
                class="row"
            >
                <ul>
                    <li>
                        <span class="mdi mdi-email"></span> - contact@badgio.pt
                    </li>
                    <li>
                        <span class="mdi mdi-home"></span> - Rua da Universidade nº1, Braga, Portugal
                    </li>
                    <li>
                        <span class="mdi mdi-deskphone"></span> - (+351) 253000000
                    </li>
                </ul>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    /*
        Global Awareness:
            1. name
    */
    name : "Footer",
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
                select_language: {
                    en: 'Change Language: ',
                    pt: 'Alterar Idioma',
                }
            },
            languages: [
                {
                    name: 'English',
                    abbreviation: 'en',
                    selected: false,
                },
                {
                    name: 'Português',
                    abbreviation: 'pt',
                    selected: false,
                },
            ],
            selected_language: ''
        }
    },
    computed: {
        display_language: {
            // getter
            get: function() {
                return this.$store.getters.getLanguage;
            },
            
            // setter
            set: function() {
                this.$store.dispatch('changeLanguageAction', this.selected_language);
            }
        }
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
    created() {
        this.selected_language = this.display_language;
    },
    /*
        Reactive Properties:
            1. methods
    */
    methods: {
        changeLanguage() {
            this.display_language = this.selected_language;
            console.log('stored_language: ', this.$store.getters.getLanguage);
        }
    }
    /*
        Rendering:
            1. template / render
    */
}
</script>

<style scoped>

footer {
    text-align: center;
    padding: 3px;
    background-color: #333;
    font-weight: bold;
    color: #fff;
}    

.row {
    width: 100%;
    margin: 0 auto 10px;
    display: flex;
    justify-content: center;
}

.contact_link {
    margin-top: 10px;
    text-decoration: none;
    color: white;
}

span {
    color:white;
}

ul {
    list-style-type: none;
    background-color: #333;
    text-align: left;
}

</style>