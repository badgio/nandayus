<template>
    <div
        class="card"
    >
        <div 
            class="alert success"
            v-if="success_banner"
            v-on:click="success_banner=false;"
        >
            <strong>
                {{language.success_form.title[this.selected_language]}}
            </strong>
            {{language.success_form.text[this.selected_language]}}
            <br>
            {{language.form_dismissal[this.selected_language]}}
        </div>
        <div
            class="alert warning"
            v-if="warning_banner"
            v-on:click="warning_banner=false;"
        >
            <strong>
                {{language.warning_form.title[this.selected_language]}}
            </strong>
            {{language.warning_form.text[this.selected_language]}}
            <br>
            {{language.form_dismissal[this.selected_language]}}
        </div>
        <div
            class="alert failure"
            v-if="error_banner"
            v-on:click="error_banner=false;"
        >
            <strong>
                {{language.failure_form.title[this.selected_language]}}
            </strong>
            {{language.failure_form.text[this.selected_language]}}
            <br>
            {{language.form_dismissal[this.selected_language]}}
        </div>
        <br>
        <br>
        <h1>
            {{pageTitle[selected_language]}}
        </h1>
        <br>
        <form
            class="form"
            id="objectForm"
            v-on:submit.prevent="submitForm"
        >
            <div
                class="form_text"
            >
                <div
                    class = "grid-container-2"
                >
                    <label
                        for="name_input"
                    >
                        {{language.name[selected_language]}}*:
                    </label>
                    <div>
                        <input
                            class="input_textfield"
                            type="text"
                            id="name_input"
                            name="name_input"
                            required
                            v-model="object.name"
                        >
                        <br>
                        <br>
                    </div>
                </div>
                <div
                    v-if="show_map"
                >
                    <label
                        for="map"
                    >
                        {{language.map[selected_language]}}*
                    </label>
                    <p>
                        {{language.mapAdvisory[selected_language]}}
                    </p>
                    <p
                        v-if="object.latitude && object.longitude"
                    >
                        {{language.curr_latitude[selected_language]}} {{this.object.latitude.toFixed(3)}} {{language.curr_longitude[selected_language]}} {{this.object.longitude.toFixed(3)}}
                    </p>
                    <br>
                    <div
                        class="map_container"
                    >
                        <l-map
                            id="map"
                            v-if="map.showMap"
                            :zoom="map.zoom"
                            :center="map.center"
                            :options="map.options"
                            v-on:dblclick="addMarker"
                        >
                            <v-geosearch
                                :options="map.geosearchOptions"
                            >
                            </v-geosearch>
                            <l-tile-layer
                                :url="map.url"
                                :attribution="map.attribution"
                            />
                            <l-marker
                                v-if="object.latitude && object.longitude"
                                :lat-lng="[object.latitude, object.longitude]"
                            >
                            </l-marker>
                        </l-map>
                    </div>
                    <br>
                    <br>
                </div>
                <div
                    v-if="show_location_attributes"
                >
                    <div
                        class = "grid-container-2"
                    >
                        <label
                            for="type_select"
                        >
                            {{language.type[selected_language]}}*:
                        </label>
                        <multiselect
                            v-model="object.type" 
                            :custom-label="customLabel"
                            value="value"
                            track-by="value"
                            :options="types" 
                            :searchable="true"
                            :close-on-select="true"
                            :multiple="false"
                            :allow-empty="false"
                            placeholder="Select One"
                            style="width: 95%; margin: 5px 0px 5px 15px;"
                        >
                        </multiselect>
                    </div>
                    <br>
                    <br>
                </div>
                <div>
                    <label
                        for="description_1"
                    >
                        {{language.description[selected_language]}}*:
                    </label>
                    <textarea
                        name="description"
                        id="description_1"
                        class = "desc_textarea"
                        :cols = "60"
                        :rows = "5"
                        required
                        v-model="object.description"
                    ></textarea>
                    <br>
                    <br>
                </div>
                <div
                    class="grid-container-2"
                    v-if="show_image"
                >
                    <div
                        id="imgPreview"
                    >
                        <label
                            for="myFile"
                        >
                            {{language.image[selected_language]}}*:
                        </label>
                        <br>
                        <br>
                        <img
                            v-if="this.object.image"
                            :src="this.object.image"
                            width=320px
                            height=270px
                        />
                        <div
                            style="width: 100%;"
                        >
                            <br>
                            <input
                                type="file"
                                id="myFile"
                                name="filename"
                                style="width: 75px; margin: 0 auto;"
                                required
                                v-on:change="onFileChange"
                            >
                        </div>
                    </div>
                    <br>
                    <br>
                </div>
                <div
                    v-if="show_duration"
                    class="grid-container-2"
                >
                    <label
                        for="state_select"
                    >
                        {{language.duration[this.selected_language]}}*:
                    </label>
                    <div>
                        <input
                            type="radio"
                            id="state_input1"
                            name="validity"
                            value="permanent"
                            v-model="object.duration"
                            required
                        >
                        <label>
                            {{language.duration.permanent[this.selected_language]}}
                        </label>
                        
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="state_input2"
                            name="validity"
                            value="temporary"
                            v-model="object.duration"
                        >
                        <label>
                            {{language.duration.temporary[this.selected_language]}}
                        </label>
                    </div>
                    <div
                        v-if="object.duration=='temporary'"
                    >
                        <br>
                        <label
                            for="beg_label"
                        >
                            {{language.duration.from[this.selected_language]}}
                        </label>
                        <input
                            class="date_input"
                            type="date"
                            name="beg_date"
                            required
                            id="beg_date"
                            v-model="object.beg_date"
                            :min=this.object.curr_date
                        >
                        <label
                            for="end_label"
                        >
                            {{language.duration.until[this.selected_language]}}
                        </label>
                        <input
                            class="date_input"
                            required
                            type="date"
                            name="end_date"
                            id="end_date"
                            v-model="object.end_date"
                            :min=latest_date
                        >
                    </div>
                    <br>
                    <br>
                    <br>
                </div>
                <div
                    v-if="get_locations"
                >
                    <div
                        class = "grid-container-2"
                    >
                        <label
                            for="location_select"
                        >
                            {{language.location[selected_language]}}:
                        </label>
                        <multiselect
                            v-model="object.locations" 
                            :custom-label="customLabelName"
                            track-by="uuid"
                            :options="locations" 
                            :searchable="true"
                            :close-on-select="true"
                            :multiple="this.multiple_locations"
                            :allow-empty="false"
                            placeholder="Select Option"
                            style="width: 95%; margin: 5px 0px 5px 15px;"
                        >
                        </multiselect>
                    </div>
                    <br>
                </div>
                <div
                    v-if="get_collections"
                >
                    <div
                    class="grid-container-2"
                    >
                        <label class="typo__label">
                            {{language.collection[selected_language]}}:
                        </label>
                        <multiselect
                            class="multi_select"
                            v-model="object.collections" 
                            label="name"
                            track-by="uuid" 
                            :options="collections" 
                            :multiple="true"
                            placeholder="Select Option(s)"
                            style="width: 95%; margin: 5px 0px 5px 15px;"
                        >
                        </multiselect>
                    </div>
                    <br>
                </div>
                <div
                    v-if="get_badges"
                >
                    <div
                    class="grid-container-2"
                    >
                        <label class="typo__label">
                            {{language.badge[this.selected_language]}}:
                        </label>
                        <multiselect
                            class="multi_select"
                            v-model="object.badges" 
                            label="name"
                            track-by="uuid" 
                            :options="badges"
                            :close-on-select="false"
                            :clear-on-select="false"
                            :preserve-search="true"
                            :multiple="true"
                            placeholder="Select Option(s)"
                            style="width: 95%; margin: 5px 0px 5px 15px;"
                        >
                        </multiselect>
                    </div>
                    <br>
                </div>
                <br>
 
                <div
                    v-if="social_networks"
                >
                    <h4>
                        Website:
                    </h4>
                    <div>
                        <input
                            class="input_textfield"
                            type="text"
                            id="site_name_input"
                            name="site_name"
                            v-model="object.website"
                        >
                    </div>
                    <br>
                    <h4>
                        {{language.social_networks[selected_language]}}
                    </h4>
                    <div
                        class = "grid-container-2"
                    >
                        <label
                            for="fb_input"
                        >
                            Facebook:
                        </label>
                        <input
                            class="input_textfield"
                            type="text"
                            id="fb_input"
                            name="fb"
                            v-model="object.facebook"
                        >
                    </div>
                    <br>
                    <div
                        class = "grid-container-2"
                    >
                        <label
                            for="tw_input"
                        >
                            Twitter
                        </label>
                        <div>
                            <input
                                class="input_textfield"
                                type="text"
                                id="tw_input"
                                name="tw"
                                v-model="object.twitter"
                            >
                        </div>
                    </div>
                    <br>
                    <div
                        class = "grid-container-2"
                    >
                        <label
                            for="insta_input"
                        >
                            Instagram
                        </label>
                        <div>
                            <input
                                class="input_textfield"
                                type="text"
                                id="insta_input"
                                name="insta"
                                v-model="object.instagram"
                            >
                        </div>
                    </div>
                    <br>
                </div>
            </div>
            <p>
                {{language.obligatory_warning[selected_language]}}
            </p>
            <br>
            <br>
            <div
                class="form_button"
            >
                <button
                    class="submit_button"
                    type="submit"
                >
                    {{submit_object[selected_language]}}
                </button>
            </div>
            <br>
        </form>
    </div>
</template>

<script>
    
    import axios from 'axios';
    import firebase from 'firebase';
    import store from '../store/index.js';
    import { latLng } from "leaflet";
    import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
    import { OpenStreetMapProvider } from 'leaflet-geosearch';
    import VGeosearch from 'vue2-leaflet-geosearch';
    import Multiselect from 'vue-multiselect'

    export default {
        /*
            Reactive Properties:
                1. methods
        */
        /*
            Rendering:
                1. template / render
        */
        /*
            Global Awareness:
                1. name
        */
        name : "NewLocation",
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
            LMap,
            LTileLayer,
            LMarker,
            LPopup,
            LTooltip,
            VGeosearch,
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
            pageTitle: {
                type: Object,
                required: true,
            },
            show_map: {
                type: Boolean,
                required: true,
            },
            show_location_attributes: {
                type: Boolean,
                required: true,
            },
            show_image: {
                type: Boolean,
                required: true,
            },
            show_duration: {
                type: Boolean,
                required: true,
            },
            get_badges: {
                type: Boolean,
                required: true,
            },
            obligatory_badge: {
                type: Boolean,
                required: true,
            },
            get_collections: {
                type: Boolean,
                required: true,
            },
            obligatory_collection: {
                type: Boolean,
                required: true,
            },
            get_locations: {
                type: Boolean,
                required: true,
            },
            obligatory_location: {
                type: Boolean,
                required: true,
            },
            multiple_locations: {
                type: Boolean,
                required: true,
            },
            social_networks: {
                type: Boolean,
                required: true,
            },
            submit_object: {
                type: Object,
                required: true,
            },
            http_request: {
                type: Object,
                required: false,
            },
            postLink: {
                type: String,
                rquired: true,
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
                    success_form: {
                        title: {
                            en: 'Success',
                            pt: 'Sucesso',
                        },
                        text: {
                            en: 'The information has been successfully submitted!',
                            pt: 'A informação foi submetida com sucesso!',
                        },
                    },
                    warning_form: {
                        title: {
                            en: 'Warning',
                            pt: 'Aviso',
                        },
                        text: {
                            en: 'Not all the required fields are filled in. These are signaled with an asterisk (*). Please make sure you fill them before resubmitting the data.',
                            pt: 'Existem campos obrigatórios sem dados. Estes estão assinalados com um asterisco (*). Por favor certifique-se que os preencheu antes da resubmissão dos dados.',
                        },
                    },
                    failure_form: {
                        title: {
                            en: 'Error',
                            pt: 'Erro',
                        },
                        text: {
                            en: 'The information has not been successfully submitted! Please try again!',
                            pt: 'A informação não foi submetida com sucesso! Por favor tente de novo!',
                        },
                    },
                    form_dismissal: {
                        en: 'Click anywhere on the warning to dismiss it.',
                        pt: 'Clique no aviso para o remover.'
                    },
                    pageTitle: {
                        en: "New Location",
                        pt: 'Novo Local',
                    },
                    name: {
                        en: 'Name',
                        pt: 'Nome',
                    },
                    map: {
                        en: 'Map',
                        pt: 'Mapa',
                    },
                    mapAdvisory: {
                        en: 'Point your location on the map, double clicking it. Assure that you are as precise as possible, as that location defines where your location will be shown on Badgio.',
                        pt: 'Assinale a localização no mapa, através de um duplo clique. Assegure-se que é o mais preciso possível, uma vez que a localização que assinalar definirá onde esta será apresentada no Badgio.'
                    },
                    curr_latitude: {
                        en: 'Current location\'s Lattitude: ',
                        pt: 'Localização atual. Latitude: '
                    },
                    curr_longitude: {
                        en: ' & Longitude: ',
                        pt: ' & Longitude: '
                    },
                    type: {
                        en: 'Type',
                        pt: 'Tipo',
                    },
                    location_type: {
                        en: 'Location Type',
                        pt: 'Tipo de Local'
                    },
                    description: {
                        en: 'Description',
                        pt: 'Descrição',
                    },
                    image: {
                        en: 'Image',
                        pt: 'Imagem',
                    },
                    duration: {
                        en: 'Duration',
                        pt: 'Duração',
                        permanent: {
                            en: 'Permanent',
                            pt: 'Permanente',
                        },
                        temporary: {
                            en: 'Temporary',
                            pt: 'Temporário',
                        },
                        from: {
                            en: 'Valid from ',
                            pt: 'Válida  de ',
                        },
                        until: {
                            en: ' until ',
                            pt: ' até ',
                        },
                    },
                    badge: {
                        en: 'Badges*',
                        pt: 'Badges*',
                    },
                    collection: {
                        en: 'Collections*',
                        pt: 'Coleções*',
                    },
                    location: {
                        en: 'Location*',
                        pt: 'Local*',
                    },
                    social_networks: {
                        en: 'Social Networks',
                        pt: 'Redes Sociais',
                    },
                    obligatory_warning: {
                        pt: 'Todos os campos assinalados com * são de preenchimento obrigatório.',
                        en: 'All fields signaled by * are required.'
                    },
                },
                success_banner: false,
                warning_banner: false,
                error_banner: false,
                object: {
                    name: '',
                    address: '',
                    latitude: null,
                    longitude: null,
                    type: '',
                    description: '',
                    image: '',
                    duration: '',
                    state: '',
                    curr_date: '',
                    beg_date: '',
                    end_date:'',
                    location: '',
                    locations: [],
                    collections:[],
                    badges: [],
                    website: '',
                    facebook: '',
                    instagram: '',
                    twitter: '',
                },
                types: [
                    {
                        name: {
                            en: 'Touristic Attraction',
                            pt: 'Atração Turística',
                        },
                        value: 'Touristic Attraction',
                    },
                    {
                        name: {
                            en: 'Commercial Establishment',
                            pt: 'Estabelecimento Comercial',
                        },
                        value: 'Commercial Establishment',
                    }
                ],
                map: {
                    zoom: 3,
                    center: latLng(41.55, -8.42), // Braga
                    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                    showMap: true,
                    geosearchOptions: {
                        provider: new OpenStreetMapProvider(),
                        style: 'button',
                        position: 'topleft',
                        showMarker: true,
                        maxSuggestions: 5,
                        animateZoom: true,
                        updateMap: true,
                        autoClose: true,
                        autoComplete: true,
                        autoCompleteDelay: 100
                    },
                },
                badges: [],
                locations: [],
                collections: [],
            }
        },
        computed: {
            selected_language() {
                return this.$store.getters.getLanguage;
            },
            latest_date: function() {
                if (this.object.curr_date < this.object.beg_date) return this.object.beg_date;
                else return this.object.curr_date;
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
            if (this.show_map) {

            }

            if (this.show_location_attributes) {

            }

            if (this.show_image) {

            }

            if (this.show_duration) {

            }

            if (this.get_locations) {
                // get jwt
                var idToken = store.getters.getToken;

                // get request to get locations
                await axios
                        .get(
                            this.http_request.getLocations,
                            {
                                headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    'Content-type': 'application/json',
                                    authorization: 'Bearer ' + idToken
                                },
                            },
                        )
                        .then((res) => {
                                for(let obj of res.data) {
                                    this.locations.push(
                                        {
                                            name: obj.name,
                                            uuid: obj.uuid,
                                        }
                                    );
                                }
                            }
                        )
                        .catch((err) => {
                                console.log(err);
                            }
                        )

                console.log('this.locations: ', this.locations)
            }
            if (this.get_badges) {
                // get jwt
                var idToken = store.getters.getToken;

                // get request to get Badges
                await axios
                        .get(
                            this.http_request.getBadges,
                            {
                                headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    'Content-type': 'application/json',
                                    authorization: 'Bearer ' + idToken
                                },
                            },
                        )
                        .then((res) => {
                                for(let obj of res.data) {
                                    this.badges.push(
                                        {
                                            name: obj.name,
                                            uuid: obj.uuid,
                                        }
                                    );
                                }
                            }
                        )
                        .catch((err) => {
                                console.log(err);
                            }
                        )

                console.log('this.badges: ', this.badges)
            }
            if(this.get_collections) {
                // get jwt
                var idToken = store.getters.getToken;

                // get request to get Collections
                await axios
                        .get(
                            this.http_request.getCollections,
                            {
                                headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    'Content-type': 'application/json',
                                    authorization: 'Bearer ' + idToken
                                },
                            },
                        )
                        .then((res) => {
                                for(let obj of res.data) {
                                    this.collections.push(
                                        {
                                            name: obj.name,
                                            uuid: obj.uuid,
                                        }
                                    );
                                }
                            }
                        )
                        .catch((err) => {
                                console.log(err);
                            }
                        )

                console.log('this.collections: ' ,this.collections)
            }
        },
        /*
            Reactive Properties:
                1. methods
        */
        methods: {
            async submitForm(e) {

                /*
                 * Badge: 1 Location. Adicionado posteriormente no menu de gestão da Coleção.
                 * Collection: n Badges. No seu menu de gestão, são adicionados n Badges e A REWARD ( SINGULAR ).
                 * Location: nada.
                 * Reward: 1 Location. Adicionada posteriormente no menu de gestão da Coleção.
                */

                var data = this.object;

                var data = {
                    name: this.object.name,
                    description: this.object.description,
                }

                var idToken = store.getters.getToken;

                let config = {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        authorization: 'Bearer ' + idToken
                    },
                };

                if (this.show_map) {
                    // add latitude and longitude to object
                    data.latitude = this.object.latitude;
                    data.longitude = this.object.longitude;
                }

                if (this.show_location_attributes) {
                    // add type to object
                    data.type = this.object.type;
                }

                if (this.show_image) {
                    data.image = this.object.image;
                }

                if (this.get_badges) {
                    //console.log('this.object.badges: ', this.object.badges);
                    if (this.object.badges.length && this.obligatory_badge) {
                        data.badges = []
                        this.object.badges.forEach(x => 
                            {
                                data.badges.push(x.uuid);
                            }
                        );
                    }
                    else {
                        //console.log('Badge error')
                        this.warning_banner = true;
                        window.scrollTo(0,0);
                        return;
                    }
                }

                if (this.get_collections) {
                    if (this.object.collections.length && this.obligatory_collection) {
                        data.collections = []
                        this.object.collections.forEach(x => 
                            {
                                data.collections.push(x.uuid);
                            }
                        );
                    }
                    else {
                        //console.log('Collection error')
                        this.warning_banner = true;
                        window.scrollTo(0,0);
                        return;
                    }
                }

                if (this.get_locations) {
                    if (this.object.locations.uuid && this.obligatory_location) {
                        data.location = this.object.locations.uuid;
                    }
                    else {
                        //console.log('Location error')
                        this.warning_banner = true;
                        window.scrollTo(0,0);
                        return;
                    }
                }

                if (this.social_networks) {
                    data.website = this.object.website;
                    data.facebook = this.object.facebook;
                    data.twitter = this.object.facebook;
                    data.instagram = this.object.instagram;
                }

                console.log(data)

                await axios.post(
                    this.postLink, 
                    data,
                    config
                ).then(
                    response => {
                        console.log('response', response)
                        if (response.status == 201) {
                            this.success_banner = true;
                        }
                        else {
                            this.error_banner = true;
                        }
                    }
                ).catch(
                    error => {
                        console.log(error)
                        this.error_banner;
                    }
                )

                window.scrollTo(0,0);
            },
            onFileChange(e) {
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.object.image = e.target.result;
                };
            },
            zoomUpdate(zoom) {
                this.currentZoom = zoom;
            },
            centerUpdate(center) {
                this.currentCenter = center;
            },
            showLongText() {
                this.showParagraph = !this.showParagraph;
            },
            addMarker(e) {
                this.object.latitude = e.latlng.lat;
                this.object.longitude = e.latlng.lng;
            },
            logger(e) {
                console.log(e)
            },
            customLabel (option) {
                return `${option.name[this.selected_language]}`
            },
            customLabelName (option) {
                return `${option.name}`
            },
        },
        /*
            Rendering:
                1. template / render
        */
    }
 </script>

<style scoped>

* {
    color: #444444;
}

h1 {
  padding : 25px;
  margin : auto;
  text-align : center;
}

p {
    font-size: 11px;
}

.card {
    width: 70%;
    margin: 25px auto 25px;
    border-radius: 8px;
    border: 1px solid #d3d3d3;
    box-shadow: 0 0 9px 1px rgba(0, 0, 0, 0.2);
    background-color: white;
}

.alert {    
    padding: 10px 5px;
    margin: 0px auto;
    border-radius: 8px;
    font-size: 14px;
    color: #333333;
}

.success {
    border: 1px solid #3f682f;
    background-color: #589D6D;
}

.success:hover {
    background-color: #487E58;
    transition: 0.3s;
}

.warning {
    border: 1px solid #ffcb11;
    background-color: #ffbf00;
}

.failure {
    border: 1px solid #cb4444;
    background-color: #d47575;
}

.failure:hover {
    background-color: #b04c4c;
    transition: 0.3s;
}

.form_button {
    text-align: center;
}

.form {
    width: 75%;
    margin: auto;
}

.selects {
    width: 100%;
}

.map_container {
    height: 500px;
    width: 85%;
    margin: 20px auto 20px;
    border: 2px solid #0a4870;
    border-radius: 5px;
}

label {
    padding-top: 10px;
    text-align: left;
    font-weight: bold;
    font-size: 16px;
}

#imgPreview {
    margin: 0 auto 0;
    font-weight: bold;
    text-align: center;
}

#imgPreview img {
    border: 2px solid #0a4870;
    border-radius: 5px;
}

input[type='file'] {
  color: transparent;
}

.grid-container {
    width: 95%;
    min-width: 200px;
    margin: 0 auto 50px;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(205px, 1fr));
    grid-gap: 25px;
}

.grid-container-2 {
    display: grid;
    grid-template-columns: repeat(auto-fill);
    grid-gap: 10px;
}

.desc_textarea {
    align-self: center;
    text-indent: 1%;
    width: 95%;
    margin: 5px 0px 5px 15px;
    border-radius: 8px;
    border: 1px solid #c8c8c8;
    background-color: #fff;
}

.input_textfield {
    height: 30px;
    width: 95%;
    margin: 5px 0px 5px 15px;
    padding: 2px;
    border-radius: 8px;
    border: 1px solid #c8c8c8;
    background-color: #fff;
    text-align: left;
    text-indent: 1%;
}

.submit_button {
    border: 1px solid #999;
    border-radius: 5px;
    background-color: #F0F8FF;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    min-width: 175px;
    min-height: 50px;
    margin: 10px auto 20px;
    cursor: pointer;
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