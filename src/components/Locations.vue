<template>
    <div>
        <h1>
            {{language.pageTitle[this.selected_language]}}
        </h1>
        <div
            class="row"
        >
            <router-link
                class="router"
                to="/newlocation"
                tag="span"
            >
                <button
                    class="submit_button"
                >
                    {{language.newButton[this.selected_language]}}
                </button>
            </router-link>
        </div>
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
            :objects="this.result_locations"
            :language="this.selected_language"
        />
    </div>
</template>

<script>
 
    import TemplateCard from './TemplateCard.vue';
 
    export default {
        name: 'Location',
        components: {
            TemplateCard,
        },
        data: () => {
            return {
                language: {
                    pageTitle: {
                        en: 'Locations',
                        pt: 'Locais',
                    },
                    filter_text: {
                        en: 'Filter your Locations',
                        pt: 'Filtrar os seus Locais',
                    },
                    newButton: {
                        en: 'Create New Location',
                        pt: 'Criar Novo Local',
                    },
                },
                searchQuery: null,
                locations: [
                    {
                        name: 'Location #1',
                        statistics: {
                            url: '/statistics/location',
                            text: {
                                en: 'Statistics',
                                pt: 'Estatísticas'
                            }
                        },
                        management: {
                            url:'/newlocation',
                            text: {
                                en: 'Management',
                                pt: 'Gestão'
                            }
                        },
                        url: '/newlocation',
                        image_link: "https://media.istockphoto.com/photos/empty-coffee-shop-picture-id1154756901",
                    },
                    {
                        name: 'Location #2',
                        statistics: {
                            url: '/statistics/location',
                            text: {
                                en: 'Statistics',
                                pt: 'Estatísticas'
                            }
                        },
                        management: {
                            url:'/newlocation',
                            text: {
                                en: 'Management',
                                pt: 'Gestão'
                            }
                        },
                        url: '/newlocation',
                        image_link: "https://media.istockphoto.com/photos/this-cafes-got-a-little-something-for-everyone-picture-id520497828",
                    },
                    {
                        name: 'Location #3',
                        statistics: {
                            url: '/statistics/location',
                            text: {
                                en: 'Statistics',
                                pt: 'Estatísticas'
                            }
                        },
                        management: {
                            url:'/newlocation',
                            text: {
                                en: 'Management',
                                pt: 'Gestão'
                            }
                        },
                        url: '/newlocation',
                        image_link: "https://media.istockphoto.com/photos/old-church-picture-id816378880",
                    },
                    {
                        name: 'Location #4',
                        statistics: {
                            url: '/statistics/location',
                            text: {
                                en: 'Statistics',
                                pt: 'Estatísticas'
                            }
                        },
                        management: {
                            url:'/newlocation',
                            text: {
                                en: 'Management',
                                pt: 'Gestão'
                            }
                        },
                        url: '/newlocation',
                        image_link: "https://images.pexels.com/photos/137038/pexels-photo-137038.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
                    },
                    {
                        name: 'Location #5',
                        statistics: {
                            url: '/statistics/location',
                            text: {
                                en: 'Statistics',
                                pt: 'Estatísticas'
                            }
                        },
                        management: {
                            url:'/newlocation',
                            text: {
                                en: 'Management',
                                pt: 'Gestão'
                            }
                        },
                        url: '/newlocation',
                        image_link: "https://i.redd.it/lefp60p4bky51.jpg",
                    },
                    {
                        name: 'Location Location Location Location Location #6',
                        statistics: {
                            url: '/statistics/location',
                            text: {
                                en: 'Statistics',
                                pt: 'Estatísticas'
                            }
                        },
                        management: {
                            url:'/newlocation',
                            text: {
                                en: 'Management',
                                pt: 'Gestão'
                            }
                        },
                        url: '/newlocation',
                        image_link: "https://i.redd.it/8f8ync5fkhy51.jpg",
                    },
                ]
            }
        },
        computed: {
            selected_language() {
                return this.$store.getters.getLanguage;
            },
            result_locations() {
                if (this.searchQuery) {
                    return this.locations.filter((item) => {
                        return this.searchQuery.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v));
                    })
                }
                else {
                    return this.locations;
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
    float: left;
    margin: 10px 0px 10px 5%;
}

.search_bar {
    height: 35px;
    width: 200px;
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