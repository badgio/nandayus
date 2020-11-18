<template>
    <div>
        <div
            class="card collection_card"
        >
            <div
                class="left_col_75"
            >
                <h3>
                    {{this.collection.name}}
                </h3>
                <h6>
                    {{language.state[this.selected_language]}}: {{this.collection.state}}
                </h6>
                <h6>
                    {{language.validity[this.selected_language]}}: {{this.collection.validity}}
                </h6>
                <h6>
                    {{language.description[this.selected_language]}}:
                </h6>
                <textarea
                    name="description"
                    id="description_1"
                    class = "desc_textarea"
                    :cols = "60"
                    :rows = "8"
                    required
                    v-model="collection.description"
                >
                </textarea>
            </div>
            <div
                class="right_col_25"
            >
                <div
                    id="imgPreview"
                >
                    <br>
                    <img
                        class="card_image"
                        src="https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038"
                        width=160px
                        height=135px
                    />
                    <br>
                    <button
                        class="submit_button"
                    >
                        {{language.browse_file[this.selected_language]}}
                    </button>
                </div>
            </div>
        </div>
        <br>
        <div
            class="card social_networks_card"
        >
            <h6>
                Website:
            </h6>
            <input
                type="url"
                id="site_name_input"
                name="site_name"
                v-model="collection.website"
            >
            <br>
            <h6>
                {{language.social_networks[this.selected_language]}}
            </h6>
            <p>
                Facebook:
            </p>
            <input
                type="url"
                id="fb_input"
                name="fb"
                v-model="collection.social_networks.facebook"
            >
            <p>
                Twitter:
            </p>
            <input
                type="url"
                id="tw_input"
                name="tw"
                v-model="collection.social_networks.twitter"
            >
            <p>
                Instagram:
            </p>
            <input
                type="url"
                id="insta_input"
                name="insta"
                v-model="collection.social_networks.instagram"
            >
        </div>
        <br>
        <div
            class="card badge_card"
        >
            <h6>
                {{language.associated_badges[this.selected_language]}}
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
                    :placeholder="language.search_badges[this.selected_language]"
                    v-model="searchQuery"
                >
                <button>
                    {{language.add[this.selected_language]}}
                </button>
            </div>
            <div
                class="badge_results"
                v-if="this.searchQuery"
            >
                <div
                    class="queried_badge"
                    v-for="(badge, index) in result_badges"
                    :key="index"
                >
                    <input
                        class="badge_button"
                        type="button"
                        value="+"
                        v-on:click="addToSelected(badge.id)"
                    >
                    <b>
                        Badge: {{badge.name}}
                    </b>
                </div>
            </div>
            <hr>
            <div
                v-if="collection.badges.length > 0"
            >
                <BadgeCard
                    v-for="badge in collection.badges"
                    :key="badge.index"
                    :id="badge.id"
                    :name="badge.name"
                    :description="badge.description"
                    :location="badge.location"
                    :imageURL="badge.image"
                    v-on:eventRemoveBadge="removeFromSelected"
                />
            </div>
            <div
                v-else
            >
                <h6>
                    {{language.no_badges[this.selected_language]}}
                </h6>
            </div>
        </div>
        <br>
        <button
            class="submit_button"
        >
            {{language.submit_changes[this.selected_language]}}
        </button>
    </div>
</template>

<script>

    import BadgeCard from './BadgeCard.vue';

    export default {
        name: 'Collection',
        components: {
            BadgeCard
        },
        data: () => {
            return {
                language: {
                    pageTitle: {
                        en: 'Collection',
                        pt: 'Coleção',
                    },
                    state: {
                        en: 'State',
                        pt: 'Estado',
                    },
                    validity: {
                        en: 'Validity',
                        pt: 'Duração',
                    },
                    description: {
                        en: 'Description',
                        pt: 'Descrição',
                    },
                    browse_file: {
                        en: 'Browse File',
                        pt: 'Carregar Ficheiro', 
                    },
                    social_networks: {
                        en: 'Social Networks',
                        pt: 'Redes Sociais'
                    },
                    associated_badges: {
                        en: 'Badges / Locations associated with the Collection:',
                        pt: 'Badges / Locais associados à Coleção:'
                    },
                    search_badges: {
                        en: 'Search Badges',
                        pt: 'Procurar Badges',
                    },
                    add: {
                        en: 'Add',
                        pt: 'Adicionar',
                    },
                    no_badges: {
                        en: 'You have no Badges associated with the Collection. Add some! If you don\'t have any, you can create some!',
                        pt: 'Não tem Badges associados à Coleção. Adicione alguns! Se não tem nenhum, pode criá-los!'
                    },
                    submit_changes: {
                        en: 'Submit Changes',
                        pt: 'Submeter Alterações',
                    },
                    obligatory_warning: {
                        pt: 'Todos os campos assinalados com * são de preenchimento obrigatório.',
                        en: 'All fields signaled by * are required.'
                    },
                },
                all_badges: [
                    {
                        id: '1',
                        name: 'André Gonçalves',
                        description: 'Description Description Description Description Description Description Description Description Description Description #1',
                        location: 'Restaurant Restaurant Restaurant #1',
                        image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038'
                    },
                    {
                        id: '2',
                        name: 'Diogo Gonçalves',
                        description: 'Description Description Description Description Description Description Description Description Description Description #2',
                        location: 'Restaurant Restaurant Restaurant #2',
                        image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038'
                    },
                    {
                        id: '3',
                        name: 'Francisco Francisco Francisco Reinolds',
                        description: 'Description Description Description Description Description Description Description Description Description Description #3',
                        location: 'Restaurant Restaurant Restaurant #3',
                        image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038'
                    },
                    {
                        id: '4',
                        name: 'José Costa',
                        description: 'Description Description Description Description Description Description Description Description Description Description #1',
                        location: 'Restaurant Restaurant Restaurant #1',
                        image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038'
                    },
                    {
                        id: '5',
                        name: 'Luís Alves',
                        description: 'Description Description Description Description Description Description Description Description Description Description #2',
                        location: 'Restaurant Restaurant Restaurant #2',
                        image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038'
                    },
                    {
                        id: '6',
                        name: 'Miguel Carvalho',
                        description: 'Description Description Description Description Description Description Description Description Description Description #3',
                        location: 'Restaurant Restaurant Restaurant #3',
                        image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038'
                    },
                    {
                        id: '7',
                        name: 'Rafaela Rodrigues',
                        description: 'Description Description Description Description Description Description Description Description Description Description #3',
                        location: 'Restaurant Restaurant Restaurant #3',
                        image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038'
                    },
                ],
                searchQuery: null,
                collection: {
                    name: 'Collection Collection Collection',
                    state: 'Approved',
                    validity: 'Permanent',
                    description: '',
                    image: '',
                    badges: [
                        {
                            id: '8',
                            name: 'Badge Badge Badge #1',
                            description: 'Description Description Description Description Description Description Description Description Description Description #1',
                            location: 'Restaurant Restaurant Restaurant #1',
                            image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038'
                        },
                        {
                            id: '9',
                            name: 'Badge Badge Badge #2',
                            description: 'Description Description Description Description Description Description Description Description Description Description #2',
                            location: 'Restaurant Restaurant Restaurant #2',
                            image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038'
                        },
                        {
                            id: '10',
                            name: 'Badge Badge Badge #3',
                            description: 'Description Description Description Description Description Description Description Description Description Description #3',
                            location: 'Restaurant Restaurant Restaurant #3',
                            image: 'https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038'
                        },
                    ],
                    website: '',
                    social_networks: {
                        facebook: '',
                        instagram: '',
                        twitter: '',
                    }
                },
            }
        },
        methods: {
            submitForm(e) {
                console.log('All gucci')
            },
            onFileChange(e) {
                const file = e.target.files[0];
                this.collection.image = URL.createObjectURL(file);
            },
            addToSelected(e) {
                this.collection.badges.push(this.all_badges.splice(this.all_badges.findIndex(x => x.id == e), 1)[0]);
                this.searchQuery = null;
            },
            removeFromSelected(e) {
                this.all_badges.push(this.collection.badges.splice(this.collection.badges.findIndex(x => x.id == e), 1)[0]);
            }
        },
        computed: {
            selected_language() {
                return this.$store.getters.getLanguage;
            },
            result_badges() {
                if (this.searchQuery) {
                    return this.all_badges.filter((item) => {
                        return this.searchQuery.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v));
                    })
                }
                else {
                    return this.all_badges;
                }
            }
        }
    }
</script>

<style scoped>

* {
  box-sizing: border-box;
  color: #0a4870;
}

.card {
    width: 85%;
    margin: 0 auto;
    background-color: #eee;
    border: 2px solid teal;
    border-radius: 5px;
}

.collection_card {
    height: 300px;
    display: grid;
    grid-auto-columns: 60% 40%;
}

.left_col_75 {
    grid-column: 1 / 2;
}

.right_col_25 {
    grid-column: 2 / 3;
}

.card_image {
    margin: 0px auto 0px;
    width: 95%;
    height: 65%;
    max-width: 300px;
    max-height: 350px;
    min-width: 150px;
    min-height: 165px;
}

.social_networks_card {
    display: grid;
}

input {
    height: 35px;
    margin: 0px 0px 10px 15px;
    border: 1px solid #999;
    border-radius: 5px;
    box-shadow: 4px 4px #ccc;
}

.social_networks_card > input {
    width: 95%;
}

.badge_card > .input_icons {
    width: 100%;
}

.badge_card > .input_icons > input {
    width: 75%;
}

.icon { 
    padding: 10px; 
    color: green; 
    min-width: 50px; 
    text-align: center; 
} 

.badge_card >.input_icons > button {
    margin: 0px 0px 10px 15px;
    width: 80px;
    height: 35px;
}

.badge_card > .badge_results {
    width: 65%;
    min-width: 280px;
    margin-left: 50px; 
}

.badge_card > .badge_results > .queried_badge {
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

.badge_card > .badge_results > .queried_badge > .badge_button {
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

h3 {
    padding-top : 15px;
}

p {
    font-size: 12px;
}

h3, h6, p {
    margin: 5px 0px 5px 15px;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
@media (max-width: 650px) {
    .card {
        width: 95%;
    }

    .collection_card {
        height: 600px;
        grid-auto-columns: 100%;
        grid-auto-rows: 50% 50%;
    }

    .left_col_75 {
        grid-row: 2 / 3;
        width: 95%;
        margin: 0 auto;
        text-align: center;
    }

    .right_col_25 {
        width: 95%;
        margin: 0 auto;
        grid-column: 1 / 2;
    }

    .card_image {
        margin: 0px auto 0px;
        width: 90%;
        height: 85%;
    }

}

#imgPreview {
    margin: 0 auto 0;
    font-weight: bold;
    text-align: center;
}

#imgPreview button {
    width: 100;
    margin: 0 auto;
    text-align: center;
}

#imgPreview img {
    border: 2px solid #0a4870;
    border-radius: 5px;
}

input[type='file'] {
  color: transparent;
}

.submit_button {
    border: 1px solid #999;
    border-radius: 5px;
    background-color: #F0F8FF;
    color: black;
    padding: 15px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    font-weight: bold;
    width: 150px;
    height: 50px;
    margin: 0px auto 20px;
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