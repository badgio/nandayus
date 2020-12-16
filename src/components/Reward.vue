<template>
    <div>
        <h1>
            {{$route.params.id}}
        </h1>
        <ManagementCard
            v-bind:title="this.reward.description"
            v-bind:paragraphs="this.reward.paragraphs"
            v-bind:website="this.reward.website"
            v-bind:social_networks="this.reward.socials"
            v-bind:delete_text="this.language.delete_text"
            v-bind:delete_link="this.getLink + this.$route.params.uuid"
            v-bind:redirect_link="'/rewards'"
        />
        <br>
        <div
            class="card collection_card"
        >
            <h6>
                {{language.associated_collections[this.selected_language]}}
            </h6>
            <div
                class="input_icons"
            >
                <i
                    class="mdi mdi-magnify icon"
                > 
                </i>
                <input
                    type="text"
                    class="search_bar"
                    :placeholder="language.search_collections[this.selected_language]"
                    v-model="searchQuery"
                >
                <button>
                    {{language.add[this.selected_language]}}
                </button>
            </div>
            <div
                class="collection_results"
                v-if="this.searchQuery"
            >
                <div
                    class="queried_collection"
                    v-for="(collection, index) in result_collections"
                    :key="index"
                >
                    <input
                        class="collection_button"
                        type="button"
                        value="+"
                        v-on:click="addToSelected(collection.id)"
                    >
                    <b>
                        Collection: {{collection.name}}
                    </b>
                </div>
            </div>
            <hr>
            <div
                v-if="reward.collections.length > 0"
            >
                <CollectionCard
                    v-for="collection in reward.collections"
                    :key="collection.index"
                    :id="collection.id"
                    :name="collection.name"
                    :description="collection.description"
                    :imageURL="collection.image"
                    :location="collection.location"
                    v-on:eventRemoveCollection="removeFromSelected"
                />
            </div>
            <div
                v-else
            >
                <h6>
                    {{language.no_collections[this.selected_language]}}
                </h6>
            </div>
        </div>
        <br>
        <div
            class="row"
        >
            <button
                class="submit_button"
            >
                {{language.submit_changes[this.selected_language]}}
            </button>
        </div>
    </div>
</template>

<script>

    import axios from 'axios';
    import firebase from "firebase";
    import store from '../store/index.js';
    import CollectionCard from './CollectionCard.vue';
    import ManagementCard from './ManagementCard.vue';

    export default {
        name: 'Reward',
        components: {
            CollectionCard,
            ManagementCard,
        },
        props: {
            getLink: {
                type: String,
                required: true,
            },
        },
        data: () => {
            return {
                pageTitle: "Reward",
                language: {
                    state: {
                        en: 'State',
                        pt: 'Estado',
                    },
                    location: {
                        en: 'Location',
                        pt: 'Localização',
                    },
                    collection: {
                        en: 'Collection',
                        pt: 'Coleção',
                    },
                    validity: {
                        en: 'Validity',
                        pt: 'Validade',
                    },
                    browse_file: {
                        en: 'Browse File',
                        pt: 'Carregar Ficheiro',
                    },
                    description: {
                        en: 'Description',
                        pt: 'Descrição',
                    },
                    associated_collections: {
                        en: 'Collections associated with the Reward:',
                        pt: 'Coleções associados à Recompensa:'
                    },
                    search_collections: {
                        en: 'Search Collections',
                        pt: 'Procurar Coleções',
                    },
                    add: {
                        en: 'Add',
                        pt: 'Adicionar',
                    },
                    no_collections: {
                        en: 'You have no Collections associated with the Reward. Add some! If you don\'t have any, you can create some!',
                        pt: 'Não tem Coleções associados à Recompensa. Adicione alguns! Se não tem nenhum, pode criá-los!'
                    },
                    submit_changes: {
                        en: 'Submit Changes',
                        pt: 'Submeter Alterações',
                    },    
                    obligatory_warning: {
                        pt: 'Todos os campos assinalados com * são de preenchimento obrigatório.',
                        en: 'All fields signaled by * are required.'
                    },
                    delete_text: {
                        pt: 'Apagar Recompensa',
                        en: 'Delete Reward',
                    },
                },
                all_collections: [
                    {
                        id: '1',
                        name: 'André Gonçalves',
                        description: 'Description Description Description Description Description Description Description Description Description Description #1',
                        image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038'
                    },
                    {
                        id: '2',
                        name: 'Diogo Gonçalves',
                        description: 'Description Description Description Description Description Description Description Description Description Description #2',
                        image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038'
                    },
                    {
                        id: '3',
                        name: 'Francisco Francisco Francisco Reinolds',
                        description: 'Description Description Description Description Description Description Description Description Description Description #3',
                        image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038'
                    },
                    {
                        id: '4',
                        name: 'José Costa',
                        description: 'Description Description Description Description Description Description Description Description Description Description #1',
                        image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038'
                    },
                    {
                        id: '5',
                        name: 'Luís Alves',
                        description: 'Description Description Description Description Description Description Description Description Description Description #2',
                        image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038'
                    },
                    {
                        id: '6',
                        name: 'Miguel Carvalho',
                        description: 'Description Description Description Description Description Description Description Description Description Description #3',
                        image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038'
                    },
                    {
                        id: '7',
                        name: 'Rafaela Rodrigues',
                        description: 'Description Description Description Description Description Description Description Description Description Description #3',
                        image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038'
                    },
                ],
                searchQuery: null,
                reward: {
                    state: '',
                    location: '',
                    validity: '',
                    description: '',
                    socials: [],
                    paragraphs: [],
                    collections: [
                        {
                            id: '8',
                            name: 'Collection Collection Collection #1',
                            description: 'Description Description Description Description Description Description Description Description Description Description #1',
                            image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038',
                            location: 'adasdasd'
                        },
                        {
                            id: '9',
                            name: 'Collection Collection Collection #2',
                            description: 'Description Description Description Description Description Description Description Description Description Description #2',
                            image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038',
                            location: 'adasdasd'
                        },
                        {
                            id: '10',
                            name: 'Collection Collection Collection #3',
                            description: 'Description Description Description Description Description Description Description Description Description Description #3',
                            image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038',
                            location: 'adasdasd'
                        },
                    ],
                },
                obligatory_warning: {
                   pt: 'Todos os campos assinalados com * são de preenchimento obrigatório.',
                   en: 'All fields signaled by * are required.'
                },
            }
        },
        async created() {
            await this.getObjects();
        },
        methods: {
            async getObjects() {
                var idToken = store.getters.getToken;

                console.log(this.getLink, this.$route.params.uuid)

                await axios
                    .get(this.getLink + this.$route.params.uuid, {
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Content-type': 'application/json',
                                authorization: 'Bearer ' + idToken
                            },
                        }
                    )
                    .then((res) => {
                            console.log(res);
                            this.reward.description = res.data.description;
                            this.reward.paragraphs = [        
                                {
                                    type: {
                                        en: 'Status',
                                        pt: 'Estado',
                                    },
                                    text: res.data.status,
                                },
                                {
                                    type: {
                                        en: 'Location',
                                        pt: 'Local',
                                    },
                                    text: res.data.location
                                },
                            ]
                            if (res.data.time_redeem == undefined) {
                                this.reward.paragraphs.push(
                                    {
                                        type: {
                                            en: 'Duration',
                                            pt: 'duração',
                                        },
                                        text: 'Permanent',
                                    }
                                )
                            }
                            else {
                                this.reward.paragraphs.push(
                                    {
                                        type: {
                                            en: 'Duration',
                                            pt: 'duração',
                                        },
                                        text: 'Temporary',
                                    }
                                )
                            }
                        }
                    )
                    .catch((err) => {
                            console.error(err)
                        }
                    );
            },
            onFileChange(e) {
                const file = e.target.files[0];
                this.badge.image = URL.createObjectURL(file);
            },
            addToSelected(e) {
                this.reward.collections.push(this.all_collections.splice(this.all_collections.findIndex(x => x.id == e), 1)[0]);
                this.searchQuery = null;
            },
            removeFromSelected(e) {
                this.all_collections.push(this.reward.collections.splice(this.reward.collections.findIndex(x => x.id == e), 1)[0]);
            }
        },
        computed: {
            selected_language() {
                return this.$store.getters.getLanguage;
            },
            result_collections() {
                if (this.searchQuery) {
                    return this.all_collections.filter((item) => {
                        return this.searchQuery.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v));
                    })
                }
                else {
                    return this.all_collections;
                }
            }
        },
    }
</script>

<style scoped>

* {
  box-sizing: border-box;
  color: #0a4870;
}


h3 {
    padding-top : 15px;
}

p {
    font-size: 12px;
}

h3, h6, p {
    margin: 10px 0px 10px 15px;
}

.card {
    width: 85%;
    margin: 10px auto 10px;
    border-radius: 5px;
}

.collection_card {
    background-color: white;
    border: 2px solid #ddd;
}

.collection_card > .input_icons {
    width: 100%;
}

.collection_card > .input_icons > input {
    width: 75%;
}

.icon { 
    padding: 10px; 
    color: green; 
    min-width: 50px; 
    text-align: center; 
} 

.collection_card >.input_icons > button {
    margin: 0px 0px 10px 15px;
    width: 80px;
    height: 35px;
}

.collection_card > .collection_results {
    width: 65%;
    min-width: 280px;
    margin-left: 50px; 
}

.collection_card > .collection_results > .queried_collection {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    min-height: 40px;
    margin: 5px auto 5px;
    background-color: white;
    border: 1px solid #0a4870;
    border-radius: 5px;
}

.collection_card > .collection_results > .queried_collection > .collection_button {
    width: 30px;
    height: 30px;
    font-size: 12pt;
    font-weight: bold;
    text-align: left;
    margin: 5px;
    border-radius: 50%;
    border: 2px solid #0a4870;
    box-shadow: 1px 1px #ccc;
    background-color: #24702C;
    color: white;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
@media (max-width: 650px) {
    .card {
        width: 95%;
    }
}

.row {
    width: 100%;
    display: flex;
    justify-content: center;
}

.row > button {
    border: 1px solid #999;
    border-radius: 5px;
    background-color: #F0F8FF;
    color: black;
    padding: 15px 15px;
    text-align: center;
    text-decoration: none;
    font-size: 12px;
    font-weight: bold;
    width: 150px;
    margin: 10px auto;
    cursor: pointer;
}

.desc_textarea {
    width: 90%;
    margin: 0px 0px 0px 15px;
    border: 1px solid #999;
    border-radius: 5px;
    box-shadow: 4px 4px #ccc;
}

</style>