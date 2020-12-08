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

    export default {
        name: 'Location',
        components: {
            TemplateCard,
        },
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
        async created() {

            var idToken = '';

            await firebase
                .auth()
                .currentUser
                .getIdToken(true)
                .then(
                    function(res) {
                        idToken = res
                    }
                );
            

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
                                    statistics: {
                                        url: '/statistics/' + this.type + '/' + obj.uuid,
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
                    }
                )
                .catch((err) => {
                        console.error(err)
                    }
                );
                
        },
        data: () => {
            return {
                searchQuery: null,
                objects:  [],
            }
        },
        mounted() {

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
        }
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