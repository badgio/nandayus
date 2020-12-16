<template>
    <div>
        <div 
            id="myModal"
            class="modal"
            v-if="displayModal"
        >
            <!-- Modal content -->
            <div 
                class="modal-content"
            >
                <div
                    class="modal-body"
                >
                    <span
                        class="close"
                        v-on:click="displayModal = !displayModal"
                    >
                        &times;
                    </span>
                    <br>
                    <br>
                    <h6>
                        {{modal_text.certainty[this.selected_language]}}
                    </h6>
                    <br>
                    <div
                        class="row"
                    >
                        <button
                            class="submit_button red_button right_float"
                            v-on:click="deleteObject"
                        >
                            {{modal_text.yes[this.selected_language]}}
                        </button>
                        <button
                            class="submit_button green_button left_float"
                            v-on:click="displayModal = !displayModal"
                        >
                            {{modal_text.no[this.selected_language]}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="card"
        >
            <div
                class="row"
            >
                <div
                    class="column half image_container"
                >
                    <div
                        v-if="this.object.image != undefined"
                    >
                        <div
                            class="overlay-image"
                        >
                            <div
                                v-on:click="onFileChange"
                            >
                                <img
                                    class="image" 
                                    :src="this.object.image" 
                                    alt="Image failed to load."
                                />
                                <div 
                                    class="hover"
                                >
                                    <div 
                                        class="text"
                                    >
                                        <input
                                            type="file"
                                            id="myFile"
                                            name="filename"
                                            style="width: 100px; margin: 0 auto;"
                                            required
                                            v-on:change="onFileChange"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="column half"
                >
                    <h3>
                        {{this.object.name}}
                    </h3>
                    <p
                        v-for="par in this.object.paragraphs"
                        :key="par.index"
                    >
                        {{par.type['en']}} {{par.text}}
                    </p>
                    <div
                        v-if="this.object.website"
                    >
                        <br>
                        <p>
                            Website
                        </p>
                        <input
                            type="text"
                            :value="this.object.website"
                            v-on:change="object.website = $event.srcElement.value;"
                        >
                    </div>
                </div>
            </div>
            <div
                class="row"
                v-if="this.object.description"
            >
                <div
                    class="column full"
                >
                    <p>
                        {{this.language.description[this.selected_language]}}
                    </p>
                    <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        :value="this.object.description"
                        v-on:change ="object.description = $event.srcElement.value;"
                    >
                    </textarea>
                </div>
            </div>
            <div
                class="row"
            >
                <div
                    class="column full"
                >
                    <div
                        v-if="this.object.social_networks.length > 0"
                    >
                        <div
                            v-for="(social, index) in this.object.social_networks"
                            :key="index"
                        >
                            <p>
                                {{social.name}}
                            </p>
                            <input
                                type="text"
                                :value="social.link"
                                v-on:change="object.social_networks[index].link = $event.srcElement.value;"
                            >
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div
                class="card collection_card"
                v-if="this.type.en == 'Badge' || this.type.en == 'Reward'"
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
                    v-if="object.collections.length > 0"
                >
                    <CollectionCard
                        v-for="collection in object.collections"
                        :key="collection.index"
                        :id="collection.id"
                        :name="collection.name"
                        :description="collection.description"
                        :imageURL="collection.image"
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
                    class="submit_button green_button left_float"
                    v-on:click="submitForm"
                >
                    {{this.language.submitChanges[this.selected_language]}}
                </button>
                <button
                    class="submit_button red_button right_float"
                    v-on:click="displayModal = !displayModal"
                >
                    {{this.delete_text[this.selected_language]}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>

    /* Libraries */
    import axios from 'axios';
    import firebase from 'firebase';
    import store from '../store/index.js';

    /* Components */
    import CollectionCard from './CollectionCard.vue';

    export default {
        /*
            Global Awareness:
                1. name
        */
        name: 'objectpage',
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
            CollectionCard,
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
            modal_text: {
                type: Object,
                required: true,
            },
            delete_text: {
                type: Object,
                required: true,
            },
            type: {
                type: Object,
                required: true,
            },
            getLink: {
                type: String,
                required: true,
            }
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
                language: {
                    description: {
                        en: 'Description:',
                        pt: 'Descrição:',
                    },
                    associated_collections: {
                        en: 'Collections associated with the Badge:',
                        pt: 'Coleções associados à Badge:'
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
                        en: 'You have no Collections associated with the Badge. Add some! If you don\'t have any, you can create some!',
                        pt: 'Não tem Coleções associados à Badge. Adicione alguns! Se não tem nenhum, pode criá-los!'
                    },
                    submitChanges: {
                        en: 'Submit Changes',
                        pt: 'Submeter Alterações',
                    },
                },
                displayModal: false,
                searchQuery: null,
                object: {
                    name: '',
                    description: '',
                    image: '',
                    paragraphs: [],
                    website: '',
                    social_networks: [],
                    collections: [],
                    locations: [],
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
                ]
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
        watch: {

        },
        async created() {
            await this.getObjects();
        },
        /*
            Reactive Properties:
                1. methods
        */
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
                            /*
                                General Attributes    
                            */
                            this.object.name = res.data.name;
                            this.object.description = res.data.description;
                            this.object.image = res.data.image;
                            this.object.paragraphs.push(
                                {
                                    type: {
                                        en: 'Status:',
                                        pt: 'Estado:',
                                    },
                                    text: res.data.status,
                                },
                            )
                            
                            /*
                                Badge's Attributes
                            */

                            if (this.type.en == 'Badge') {
                                this.object.paragraphs.push(
                                    {
                                        type: {
                                            en: 'Duration:',
                                            pt: 'Duração:',
                                        },
                                        text: res.data.duration,
                                    },
                                )
                            }

                            /*
                                Collection's Attributes
                            */
                            /*
                                Location's Attributes
                            */
                            
                            if (this.type.en == 'Location') {
                                this.object.website = res.data.website;
                                this.object.paragraphs.push(
                                    {
                                        type: {
                                            en: 'Type:',
                                            pt: 'Tipo:',
                                        },
                                        text: res.data.type,
                                    },
                                )
                                this.object.social_networks.push(
                                    {
                                        name: 'Facebook',
                                        link: res.data.facebook || '',
                                    },
                                    {
                                        name: 'Instagram',
                                        link: res.data.instagram || '',
                                    },
                                    {
                                        name: 'Twitter',
                                        link: res.data.twitter || '',
                                    },
                                )
                            }

                            console.log(this.object.social_networks)

                            /*
                                Reward's Attributes
                            */
                        }
                    )
                    .catch((err) => {
                            console.error(err)
                        }
                    );
            },
            async submitForm(e) {

                var idToken = store.getters.getToken;
                
                var toSend = {
                    description: this.object.description,
                    //image: this.object.image,
                };

                /* 
                    Badge's Attributes
                */

                if (this.type.en == 'Badge') {
                    // uncomment after collection's crud completion HAHAHAHAHAHAHAHAHAHAH
                    //data.collections = this.object.collections;
                }

                /*
                    Location's Attributes
                */

                if (this.type.en == 'Location') {
                    data.website = this.object.website;
                    data.facebook = this.object.social_networks[0].link;
                    data.instagram = this.object.social_networks[1].link;
                    data.twitter = this.object.social_networks[2].link;
                }

                let config = {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        authorization: 'Bearer ' + idToken
                    },
                };

                await axios.patch(
                        this.getLink + this.$route.params.uuid, 
                        toSend, 
                        config,
                    )
                    .then((res) => {
                        console.log(res);
                        this.$router.push({ path: this.type.path })
                    })  
                    .catch((err) => {
                        console.error(err)
                    })


            },
            onFileChange(e) {
                const file = e.target.files[0];
                this.object.image = URL.createObjectURL(file);
            },
            async deleteObject(e) {
                var idToken = store.getters.getToken;

                const res = await axios.delete(this.getLink + this.$route.params.uuid, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        authorization: 'Bearer ' + idToken
                    },
                });

                if (res.status == 200) {
                    this.$router.push({ path: this.type.path })
                }
                else {
                    console.log('Something went wrong... HTTP Status [', res.status, ']');
                }
            },
            inputFunc(value, element) {
                console.log(element, value)
                element = value;
            },
            addToSelected(e) {
                this.object.collections.push(this.all_collections.splice(this.all_collections.findIndex(x => x.id == e), 1)[0]);
                this.searchQuery = null;
            },
            removeFromSelected(e) {
                this.all_collections.push(this.object.collections.splice(this.object.collections.findIndex(x => x.id == e), 1)[0]);
            }
        },
        /*
            Rendering:
                1. template / render
        */
    }
</script>

<style scoped>

* {
    color: #232323;
    box-sizing: border-box;
}

h3 {
    padding-top : 15px;
}

p {
    font-size: 12px;
}

h3, h6, p {
    margin: 5px 0px 5px 15px;
    color: #047;
}

.card {
    width: 90%;
    margin: 25px auto 25px;
    padding-bottom: 15px;
    border-radius: 8px;
    border: 1px solid #d3d3d3;
    box-shadow: 0 0 9px 1px rgba(0, 0, 0, 0.2);
    background-color: white;
}

/* Create two equal columns that floats next to each other */
.column {
    float: right;
    padding: 10px;
    border-radius: 5px;
}

.half {
    width: 50%;
}

.full {
    width: 100%;
}

.row:after {
    width: 95%;
    margin: 0 auto;
    content: "";
    display: table;
    clear: both;
}

input[type=text] {
    height: 30px;
    width: 95%;
    margin: 5px 0px 5px 15px;
    padding: 5px;
    border-radius: 8px;
    border: 1px solid #c8c8c8;
    background-color: #ececec;
}

input[type='file'] {
  color: transparent;
}

textarea {
    width: 95%;
    margin: 5px 0px 5px 15px;
    padding: 5px;
    border-radius: 8px;
    border: 1px solid #c8c8c8;
    background-color: #ececec;
}

.submit_button {
    margin: 10px auto;
    min-width: 75px;
    min-height: 35px;
    border-radius: 8px;
    border: 1px solid #ececec;
    color: white;
}

.submit_button:hover {
    transition: 0.2s;
    transition-delay: 0.05s;
}

.red_button {
    background-color: #F52B2B;
}

.red_button:hover {
    background-color: #C13A3A;
}

.green_button {
    background-color: #048700;
}

.green_button:hover {
    background-color: #056B02;
}

.left_float {
    float: left;
    margin-left: 2.5%;
}

.right_float {
    float: right;
    margin-right: 5%;
}

.image_container {
    position: relative;
    display: flex;
    justify-content: center;
}

img {
    align-self: center;
    border: 1px solid #ececec;
    border-radius: 5px;
    width: 100%;
    height: 80%;
    margin-top: 15px;
    max-width: 400px;
    max-height: 250px;
}

/*
    Collection Card
*/

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

@media only screen and (max-width: 600px) {
    .column {
        width: 100%;
    }

    .card_image {
        margin: 0px auto 0px;
        width: 90%;
        height: 85%;
    }
}


/**/

/********* Simple or original overlay *******/

/* Main container */

.overlay-image {
 position: relative;
 width: 100%;
}

/* Original image */
.overlay-image .image {
 display: block;
 width: 100%;
 height: auto;
}

/* Original text overlay */
.overlay-image .text {
 color: #fff;
 font-size: 30px;
 line-height: 1.5em;
 text-shadow: 2px 2px 2px #000;
 text-align: center;
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 width: 100%;
}

/********* Overlay on hover *******/
/* New overlay on hover */
.overlay-image .hover {
 position: absolute;
 top: 0;
 height: 99%;
 width: 100%;
 opacity: 0;
 border-radius: 5px;
 transition: .5s ease;
}
/* New overlay appearance on hover */
.overlay-image:hover .hover {
 opacity: 1;
}

/********* Background and text only overlay on hover *******/
.overlay-image .normal {
 transition: .5s ease;
}
.overlay-image:hover .normal {
 opacity: 0;
}
.overlay-image .hover {
 background-color: rgba(0,0,0,0.5);
}

/* Modal */

.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 500px;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
}

@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

/* The Close Button */
.close {
  color: black;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 2px 16px;
  background-color: #ececec;
  color: white;
}

.modal-body {padding: 2px 16px;}

.modal-footer {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}

</style>
