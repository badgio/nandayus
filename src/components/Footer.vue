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
    name : "Footer",
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
    created() {
        this.selected_language = this.display_language;
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
    methods: {
        changeLanguage() {
            this.display_language = this.selected_language;
            console.log('stored_language: ', this.$store.getters.getLanguage);
        }
    }
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

span {
    color:white;
}

ul {
    list-style-type: none;
    background-color: #333;
    text-align: left;
}

</style>