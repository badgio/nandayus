<template>
    <div>
        <br>
        <h1>
            {{language.pageTitle[this.selected_language]}}
        </h1>
        <br>
        <div
            class="row"
        >
            <router-link
                class="router"
                :to="toLink"
                tag="span"
            >
                <button
                    class="submit_button"
                >
                    {{language.newButton[this.selected_language]}}
                </button>
            </router-link>
        </div>
        <br>
        <hr>
        <div
            class="filter"
        >
            <i
                class="mdi mdi-magnify icon"
            > 
            </i>
            <input
                type="text"
                class="search_bar"
                :placeholder="language.filter_text[this.selected_language]"
                v-model="searchQuery"
            >
        </div>
        <TemplateCard
            :objects="this.result_data"
            :language="this.selected_language"
        />
    </div>
</template>

<script>
 
    import TemplateCard from './TemplateCard.vue';
    import axios from 'axios';
    import firebase from "firebase";
    import store from '../store/index.js';

    export default {
        /*
            Global Awareness:
                1. name
        */
        name: 'Location',
        /*
            Template Modifiers:
                1. delimiters
        */
        /*
            Template Dependencies:
                1. components
                2. directives
        */
        components: {
            TemplateCard,
        },
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
        props: {
            language: {
                type: Object,
                required: true,
            },
            toLink: {
                type: String,
                required: true,
            },
            getLink: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
        },
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
                searchQuery: null,
                objects:  [],
            }
        },
        computed: {
            selected_language() {
                return this.$store.getters.getLanguage;
            },
            result_data() {
                if (this.searchQuery) {
                    return this.objects.filter((item) => {
                        return this.searchQuery.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v));
                    })
                }
                else {
                    return this.objects;
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
        async created() {
            this.getObjects();
        },
        /*
        Reactive Properties:
            1. methods
        */
        methods: {
            async getObjects() {
                var idToken = store.getters.getToken;

                await axios
                    .get(this.getLink, {
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Content-type': 'application/json',
                                authorization: 'Bearer ' + idToken
                            },
                        }
                    )
                    .then((res) => {
                            for (let obj of res.data) {
                                this.objects.push(
                                    {
                                        id: obj.uuid,
                                        name: obj.name,
                                        description: obj.description,
                                        statistics: {
                                            url: '/' + this.type + '/' + obj.uuid + '/statistics/',
                                            text: {
                                                en: 'Statistics',
                                                pt: 'Estatísticas'
                                            }
                                        },
                                        management: {
                                            url: '/' + this.type + '/' + obj.uuid,
                                            text: {
                                                en: 'Management',
                                                pt: 'Gestão'
                                            }
                                        },
                                        url: '/' + this.type + '/' + obj.uuid,
                                        image_link: obj.image,
                                    }
                                );
                            }
                            console.log(this.objects)
                        }
                    )
                    .catch((err) => {
                            console.error(err)
                        }
                    );
            },
        },
        /*
            Rendering:
                1. template / render
        */
    }
</script>

<style scoped>

h1 {
  padding-top : 25px;
  margin : 0 auto 0;
  color: #0a4870;
  font-weight: bold;
  text-align: center;
}

.row {
    width: 100%;
    text-align: center;
}

.router {
    margin: 0px auto 0px;
    text-align: center;
}

.filter {
    float: right;
    margin: 10px 5% 10px 0px;
}

.search_bar {
    height: 35px;
    width: 200px;
    margin-left: 10px;
    border: 1px solid #999;
    border-radius: 5px;
    box-shadow: 4px 4px #ccc;
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
    cursor: pointer;
}

</style>