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
                            <div>
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
                v-if="this.type.en == 'Location'"
            >
                <h4>
                    Badges:
                </h4>
                <div
                    v-if="this.object.badges.length > 0"
                >
                    <h5
                        
                        v-for="(item, index) in this.object.badges"
                        :key="index"
                    >
                        {{index + 1}}. {{item.name}} 
                    </h5>
                </div>
                <h5
                    v-else
                >
                    Not associated to any badges.
                </h5>
                <br>
            </div>
            <div
                v-if="this.type.en == 'Badge' || this.type.en == 'Location' || this.type.en == 'Reward'"
            >
                <h4>
                    Collections:
                </h4>
                <div
                    v-if="this.object.collections.length > 0"
                >
                    <h5
                        
                        v-for="(item, index) in this.object.collections"
                        :key="index"
                    >
                        {{index + 1}}. {{item.name}} 
                    </h5>
                </div>
                <h5
                    v-else
                >
                    Not associated to any collections.
                </h5>
                <br>
            </div>
            <div
                v-if="this.type.en == 'Badge' || this.type.en == 'Reward'"
            >
                <h4>
                    Location:
                </h4>
                <div
                    v-if="this.object.location"
                >   
                    <h5>
                        ID: {{this.object.location.uuid}}
                    </h5>
                    <h5>
                        Name: {{this.object.location.name}}
                    </h5>
                </div>
                <br>
            </div>
            <div
                v-if="this.type.en == 'Location'"
            >
                <h4>
                    Rewards:
                </h4>
                <div
                    v-if="this.object.rewards.length > 0"
                >
                    <h5
                        
                        v-for="(item, index) in this.object.rewards"
                        :key="index"
                    >
                        {{index + 1}}. {{item.name}} 
                    </h5>
                </div>
                <h5
                    v-else
                >
                    Not associated to any rewards.
                </h5>
                <br>
            </div>
            <div
                v-if="this.type.en=='Collection'"
            >
                <h4>
                    Badges:
                </h4>
                <h5>
                    Associated Badges:
                </h5>
                <div
                    v-if="this.object.badges.length > 0"
                >
                    <h6
                        v-for="(item, index) in this.object.badges"
                        :key="index"
                    >
                        {{index + 1}}. {{item.name}}
                    </h6>
                </div>
                <br>
                <h5>
                    Available Badges:
                </h5>
                <multiselect
                    class="multi_select"
                    v-model="object.badges"
                    label="name"
                    track-by="uuid" 
                    :options="all_badges"
                    :close-on-select="true"
                    :clear-on-select="true"
                    :preserve-search="true"
                    :multiple="true"
                    placeholder="Select Option(s)"
                    style="width: 95%; margin: 5px 0px 5px 15px;"
                >
                        <template 
                            slot="selection"
                            slot-scope="{ values, isOpen }"
                        >
                            <span
                                class="multiselect__single"
                                v-if="values.length &amp;&amp; !isOpen"
                                style="color: grey;"
                            >
                                {{ values.length }} options selected
                            </span>
                        </template>
                </multiselect>
                <br>
                <h4>
                    Reward:
                </h4>
                <h5>
                    Associated Reward:
                </h5>
                <h6
                    v-if="this.associated_reward"
                >
                    {{this.associated_reward.name}}
                </h6>
                <h6
                    v-else
                >
                    No Reward associated! Search for one and add it!
                </h6>
                <br>
                <h5>
                    Available Rewards:
                </h5>
                <multiselect
                    class="multi_select"
                    v-model="object.reward"
                    label="name"
                    track-by="uuid" 
                    :options="all_rewards"
                    :close-on-select="true"
                    :clear-on-select="true"
                    :preserve-search="true"
                    :multiple="false"
                    placeholder="Select Option(s)"
                    style="width: 95%; margin: 5px 0px 5px 15px;"
                >
                </multiselect>
                <br>
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
                <hr
                    style="width: 95%; margin: 5px 0px 5px 15px; color: #999;"
                >
            </div>
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
    import Multiselect from 'vue-multiselect';

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
            Multiselect,
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
            http_requests: {
                type: Object,
                rqeuired: true,
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
                    uuid: '',
                    name: '',
                    description: '',
                    image: '',
                    paragraphs: [],
                    website: '',
                    social_networks: [],
                    badges: [],
                    collections: [],
                    location: null,
                    locations: [],
                    reward: null,
                    rewards: [],
                },
                all_badges: [],
                badges_uuid: [],
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
                all_locations: [],
                location_uuid: null,
                all_rewards: [],
                reward_uuid: null,
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
            },
            associated_badge() {
                return this.object.badge;
            },
            associated_reward() {
                return this.object.reward;
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
                            /*
                                General Attributes    
                            */
                            this.object.uuid = res.data.uuid;
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
                                this.location_uuid = res.data.location;   
                            }

                            /*
                                Collection's Attributes
                            */

                            if (this.type.en == 'Collection') {
                                this.badges_uuid = res.data.badges;
                                this.reward_uuid = res.data.reward;
                            }

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

                            /*
                                Reward's Attributes
                            */

                            if (this.type.en == 'Reward') {
                                this.location_uuid = res.data.location;
                            }
                        }
                    )
                    .catch((err) => {
                            console.error(err)
                        }
                    );

                    /*
                        Get Requests to receive remaining Badge data
                    */

                    if (this.type.en == 'Badge') {
                        if (this.location_uuid) {
                            await axios
                                .get(this.http_requests.getLocations + this.location_uuid, {
                                        headers: {
                                            'Access-Control-Allow-Origin': '*',
                                            'Content-type': 'application/json',
                                            authorization: 'Bearer ' + idToken
                                        },
                                    }
                                )
                                .then((res) => {
                                        this.object.location = res.data;
                                    }
                                )
                                .catch((err) => {
                                        console.error(err)
                                    }
                                );
                        }

                        /*
                        // Get associated collections
                        console.log('uuid: ', this.object.uuid)
                        console.log('url: ', this.http_requests.getCollections + '?badge__uuid=\'' + this.object.uuid + '\'')
                        await axios
                                .get(this.http_requests.getCollections + '/?badge__uuid=\'' + this.object.uuid + '\'', {
                                        headers: {
                                            'Access-Control-Allow-Origin': '*',
                                            'Content-type': 'application/json',
                                            authorization: 'Bearer ' + idToken
                                        },
                                    }
                                )
                                .then((res) => {
                                        console.log('Collections GET res: ', res);
                                    }
                                )
                                .catch((err) => {
                                        console.error(err)
                                    }
                                );
                        */
                    }
                    
                    /*
                        Get Requests to receive remaining Collection data
                    */

                    if (this.type.en == 'Collection') {
                        /*
                            Get every reward
                        */
                        await axios
                            .get(this.http_requests.getRewards, {
                                    headers: {
                                        'Access-Control-Allow-Origin': '*',
                                        'Content-type': 'application/json',
                                        authorization: 'Bearer ' + idToken
                                    },
                                }
                            )
                            .then((res) => {
                                    this.all_rewards = res.data;
                                }
                            )
                            .catch((err) => {
                                    console.error(err)
                                }
                            );

                        

                        if (this.reward_uuid != null) {
                            console.log('All Rewards: ', this.all_rewards)
                            var rew_uuid = this.all_rewards.map(b => {
                                return b.uuid;
                            }).indexOf(this.reward_uuid);
                            console.log('Rew UUID: ', rew_uuid)
                            this.object.reward = this.all_rewards[rew_uuid];
                        }

                        else console.log('this.reward_uuid is null!');

                        /*
                            Get every badge
                        */

                        await axios
                            .get(this.http_requests.getBadges, {
                                    headers: {
                                        'Access-Control-Allow-Origin': '*',
                                        'Content-type': 'application/json',
                                        authorization: 'Bearer ' + idToken
                                    },
                                }
                            )
                            .then((res) => {
                                    this.all_badges = res.data;

                                    // go through every badge associated to the collection
                                    this.badges_uuid.forEach(x => {
                                        // go through every available badge and then add them to the associated array
                                        var b_uuid = this.all_badges.map(b => {
                                            return b.uuid;
                                        }).indexOf(x);
                                        if (b_uuid > -1) {
                                            var spliced_badges = this.all_badges.splice(b_uuid, 1);
                                            var selBadge = spliced_badges[0];
                                            this.object.badges.push(
                                                selBadge
                                            );
                                        }
                                    })

                                    console.log(this.all_badges);
                                }
                            )
                            .catch((err) => {
                                    console.error(err)
                                }
                            );
                    }

                    /*
                        Get Requests to receive remaining Location data
                    */

                    if (this.type.en == 'Location') {

                        // Get Badges associated with the location
                        
                        await axios
                            .get(this.http_requests.getBadges, {
                                    headers: {
                                        'Access-Control-Allow-Origin': '*',
                                        'Content-type': 'application/json',
                                        authorization: 'Bearer ' + idToken
                                    },
                                    params: {
                                        location__uuid: this.object.uuid,
                                    },
                                }
                            )
                            .then((res) => {
                                    res.data.forEach(x => {
                                        this.object.badges.push({
                                           name:  x.name
                                        })
                                    })
                                }
                            )
                            .catch((err) => {
                                    console.error(err)
                                }
                            );

                        // Get Rewards associated with the location
                        
                        await axios
                            .get(this.http_requests.getRewards , {
                                    headers: {
                                        'Access-Control-Allow-Origin': '*',
                                        'Content-type': 'application/json',
                                        authorization: 'Bearer ' + idToken
                                    },
                                    params: {
                                        location__uuid: this.object.uuid,
                                    },
                                }
                            )
                            .then((res) => {
                                    res.data.forEach(x => {
                                        this.object.rewards.push({
                                           name:  x.name
                                        })
                                    })
                                }
                            )
                            .catch((err) => {
                                    console.error(err)
                                }
                            );
                    }

                    /*
                        Get Requests to receive remaining Reward data
                    */

                    if (this.type.en == 'Reward') {
                        if (this.location_uuid) {
                            await axios
                                .get(this.http_requests.getLocations + this.location_uuid, {
                                        headers: {
                                            'Access-Control-Allow-Origin': '*',
                                            'Content-type': 'application/json',
                                            authorization: 'Bearer ' + idToken
                                        },
                                    }
                                )
                                .then((res) => {
                                        this.object.location = res.data;
                                    }
                                )
                                .catch((err) => {
                                        console.error(err)
                                    }
                                );
                        }

                        // Get Collections associated with the reward
                        
                        await axios
                            .get(this.http_requests.getCollections , {
                                    headers: {
                                        'Access-Control-Allow-Origin': '*',
                                        'Content-type': 'application/json',
                                        authorization: 'Bearer ' + idToken
                                    },
                                    params: {
                                        reward__uuid: this.object.uuid,
                                    },
                                }
                            )
                            .then((res) => {
                                    res.data.forEach(x => {
                                        this.object.collections.push({
                                           name:  x.name
                                        })
                                    })
                                }
                            )
                            .catch((err) => {
                                    console.error(err)
                                }
                            );

                    }
            },
            async submitForm(e) {

                var idToken = store.getters.getToken;
                
                var toSend = {
                    description: this.object.description,
                    image: this.object.image,
                };

                /* 
                    Badge's Attributes
                */

                if (this.type.en == 'Badge') {
                    // uncomment after collection's crud completion HAHAHAHAHAHAHAHAHAHAH
                    //data.collections = this.object.collections;
                }

                /*
                    Collection's Attributes
                */

                if (this.type.en == 'Collection') {
                    if (this.object.reward) toSend.reward = this.object.reward.uuid;
                    else toSend.reward = '';
                    toSend.badges = []
                    this.object.badges.forEach(x => {
                        toSend.badges.push(x.uuid);
                    })
                }

                /*
                    Location's Attributes
                */

                if (this.type.en == 'Location') {
                    toSend.website = this.object.website;
                    toSend.facebook = this.object.social_networks[0].link;
                    toSend.instagram = this.object.social_networks[1].link;
                    toSend.twitter = this.object.social_networks[2].link;
                }

                let config = {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        authorization: 'Bearer ' + idToken
                    },
                };
                
                console.log('toSend: ', toSend)

                await axios
                    .patch(
                        this.getLink + this.$route.params.uuid, 
                        toSend, 
                        config,
                    )
                    .then((res) => {
                        this.$router.push({ path: this.type.path })
                    })  
                    .catch((err) => {
                        console.error(err)
                    })

            },
            onFileChange(e) {
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.object.image = e.target.result;
                };
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

h3, h4, h5, h6, p {
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
    background-color: white;
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
    background-color: white;
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

<style>

/* Multi-select */

/* fix multiselect weird height when using a placeholder */
.multiselect__placeholder {
  display: inline-block !important;
  margin-bottom: 0px !important;
  padding-top: 0px !important;
}

/* error class on multiselect */
.multiselect.invalid .multiselect__tags {
  border: 1px solid #f86c6b !important;
}

/* override default multiselect styles */
.multiselect__option--highlight {
  background: #ececec !important;
  color: #333 !important;
}

.multiselect__option--highlight:after {
  background: #ececec !important;
}

.multiselect__tags {
  padding: 5px !important;
  min-height: 10px;
}

.multiselect__placeholder{
  margin-left: 10px;
  margin-top: 2px;
}

.multiselect__tag {
  background: #ececec !important;
  border: 1px solid rgba(60, 60, 60, 0.26) !important;
  color: #333 !important;
  margin-bottom: 0px !important;
  margin-right: 5px !important;
}

.multiselect__tag-icon:after {
  color: rgba(60, 60, 60, 0.5) !important;
}

.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: #ececec !important;
}

.multiselect__tag-icon:focus:after,
.multiselect__tag-icon:hover:after {
  color: red !important;
}

.multiselect.invalid .multiselect__tags,
.multiselect.invalid .multiselect__tags span,
.multiselect.invalid .multiselect__tags input {
  background:red;
}

</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
