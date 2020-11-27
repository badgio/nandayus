<template>
    <div
        class="card"
    >
        <h1>
            {{pageTitle[selected_language]}}
        </h1>
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
                    </div>
                </div>
                <div
                    v-if="show_map"
                >
                    <br>
                    <label
                        for="map"
                    >
                        {{language.map[selected_language]}}*
                    </label>
                    <p>
                        {{language.mapAdvisory[selected_language]}}
                    </p>
                    <p
                        v-if="object.position.lattitude && object.position.longitude"
                    >
                        {{language.curr_lattitude[selected_language]}} {{this.object.position.lattitude.toFixed(3)}} {{language.curr_longitude[selected_language]}} {{this.object.position.longitude.toFixed(3)}}
                    </p>
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
                                v-if="object.position.lattitude && object.position.longitude"
                                :lat-lng="[object.position.lattitude, object.position.longitude]"
                            >
                            </l-marker>
                        </l-map>
                    </div>
                </div>
                <div
                    v-if="show_location_attributes"
                >
                    <div
                        class = "grid-container-2"
                    >
                        <label
                            for="address_select"
                        >
                            {{language.address[selected_language]}}*:
                        </label>
                        <div>
                            <input
                                class="input_textfield"
                                type="text"
                                id="address_select"
                                name="address_select"
                                required
                                v-model="object.address"
                            >
                        </div>
                    </div>
                    <div
                        class = "grid-container-2"
                    >
                        <label
                            for="type_select"
                        >
                            {{language.type[selected_language]}}*:
                        </label>
                        <select
                            name="type_select"
                            id="type_select"
                            required
                            v-model="object.type"
                        >
                            <option
                                value=""
                                selected
                                disabled
                            >
                                {{language.location_type[selected_language]}}
                            </option>
                            <option
                                v-for="type in types"
                                :key=type.index
                                :value="type.name"
                            >
                                {{type.name[selected_language]}}
                            </option>
                        </select>
                    </div>
                    <div
                        class="grid-container-2"
                    >
                        <label
                            for="postal_code_select"
                        >
                            {{language.postal_code[selected_language]}}*:
                        </label>
                        <input
                            class="input_textfield"
                            type="text"
                            id="postal_code_select"
                            name="postal_code_select"
                            required
                            v-model="object.postal_code"
                        >
                    </div>
                    <div
                        class="grid-container-2"
                    >
                        <label
                            for="district_select"
                        >
                            {{language.district[selected_language]}}*:
                        </label>
                        <input
                            class="input_textfield"
                            type="text"
                            id="district_select"
                            name="district_select"
                            required
                            v-model="object.district"
                        >
                    </div>
                    <div
                        class="grid-container-2"
                    >
                        <label
                            for="country_select"
                        >
                            {{language.country[selected_language]}}*:
                        </label>
                        <select
                            name="country_select"
                            id="country_select"
                            required
                            v-model="object.country"
                        >
                            <option
                                value=""
                                selected
                                disabled
                            >
                                {{language.country[selected_language]}}
                            </option>
                            <option
                                v-for="country in countries"
                                :key=country.index
                                :value="country.name"
                            >
                                {{country.name}}
                            </option>
                        </select>
                    </div>
                </div>
                <br>
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
                </div>
                <br>
                <div
                    class="grid-container-2"
                >
                    <div
                        id="imgPreview"
                    >
                        <label
                            for="myFile"
                        >
                            {{language.image[selected_language]}}*:
                        </label>
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
                </div>
                <br>
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
                            value="permanent"
                            v-model="object.duration"
                        >
                        <label>
                            {{language.duration.permanent[this.selected_language]}}
                        </label>
                        
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="state_input2"
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
                            type="date"
                            name="end_date"
                            id="end_date"
                            v-model="object.end_date"
                            :min=latest_date
                        >
                    </div>  
                </div>
                <div
                    v-if="show_badge_attributes"
                >
                    <div
                        class = "grid-container-2"
                    >
                        <br>
                        <label
                            for="location_select"
                        >
                            {{language.location[selected_language]}}
                        </label>
                        <select
                            name="location_select"
                            id="location_select"
                            v-model="object.location"
                        >   
                            <option
                                value=""
                                selected
                                disabled
                            >
                                {{language.location[selected_language]}}
                            </option>
                            <option
                                v-for="location in locations"
                                :key=location.index
                                :value="location.name"
                            >
                                {{location.name}}
                            </option>
                        </select>
                    </div>
                    <div
                        class="grid-container-2"
                    >
                        <br>
                        <label
                            for="collection_select"
                        >
                            {{language.collection[selected_language]}}
                        </label>
                        <select
                            name="collection_select"
                            id="collection_select"
                            v-model="object.collection"
                        >
                            <option
                                value=""
                                selected
                                disabled
                            >
                                {{language.collection[selected_language]}}
                            </option>
                            <option
                                v-for="collection in collections"
                                :key=collection.index
                                :value="collection.name"
                            >
                                {{collection.name}}
                            </option>
                        </select>
                    </div>
                </div>
                <div
                    v-if="social_networks"
                >
                    <br>
                    <h4>
                        Website:
                    </h4>
                    <div>
                        <input
                            class="input_textfield"
                            type="url"
                            id="site_name_input"
                            name="site_name"
                            v-model="object.website"
                        >
                    </div>
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
                            type="url"
                            id="fb_input"
                            name="fb"
                            v-model="object.social_networks.facebook"
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
                                type="url"
                                id="tw_input"
                                name="tw"
                                v-model="object.social_networks.twitter"
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
                                type="url"
                                id="insta_input"
                                name="insta"
                                v-model="object.social_networks.instagram"
                            >
                        </div>
                    </div>
                </div>
            </div>
            <p>
                {{language.obligatory_warning[selected_language]}}
            </p>
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
        </form>
    </div>
</template>

<script>
    
    import axios from 'axios';
    import { latLng } from "leaflet";
    import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
    import { OpenStreetMapProvider } from 'leaflet-geosearch';
    import VGeosearch from 'vue2-leaflet-geosearch';

    export default {
        name : "NewLocation",
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup,
            LTooltip,
            VGeosearch,
        },
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
            show_duration: {
                type: Boolean,
                required: true,
            },
            show_badge_attributes: {
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
        },
        data: () => {
            return {
                language: {
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
                    curr_lattitude: {
                        en: 'Current location\'s Lattitude: ',
                        pt: 'Localização atual. Latitude: '
                    },
                    curr_longitude: {
                        en: ' & Longitude: ',
                        pt: ' & Longitude: '
                    },
                    address: {
                        en: 'Address',
                        pt: 'Morada',
                    },
                    type: {
                        en: 'Type',
                        pt: 'Tipo',
                    },
                    location_type: {
                        en: 'Location Type',
                        pt: 'Tipo de Local'
                    },
                    postal_code: {
                        en: 'Postal Code',
                        pt: 'Código Postal',
                    },
                    district: {
                        en: 'District',
                        pt: 'Distrito',
                    },
                    country: {
                        en: 'Country',
                        pt: 'País',
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
                    location: {
                        en: 'Location',
                        pt: 'Local',
                    },
                    collection: {
                        en: 'Collection',
                        pt: 'Coleção',
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
                object: {
                    name: '',
                    address: '',
                    position: {
                        lattitude: null,
                        longitude: null
                    },
                    type: '',
                    postal_code: '',
                    district: '',
                    country: '',
                    description: '',
                    image: '',
                    duration: '',
                    state: '',
                    curr_date: '',
                    beg_date: '',
                    end_date:'',
                    location: '',
                    collection: '',
                    website: '',
                    social_networks: {
                        facebook: '',
                        instagram: '',
                        twitter: '',
                    }
                },
                types: [
                    {
                        name: {
                            en: 'Touristic Attraction',
                            pt: 'Atração Turística',
                        },
                    },
                    {
                        name: {
                            en: 'Commercial Establishment',
                            pt: 'Estabelecimento Comercial',
                        },
                    }
                ],
                countries: [
                    {
                        name: 'Portugal'
                    },
                    {
                        name: 'España'
                    },
                    {
                        name: 'France'
                    },
                    {
                        name: 'Deutschland'
                    },
                    {
                        name: 'Oesterreich'
                    },
                    {
                        name: 'Schweiz'
                    },
                    {
                        name: 'Italia'
                    },
                    {
                        name: 'United Kingdom'
                    },
                    {
                        name: 'Ireland'
                    },
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
                locations: [
                    {
                        name: 'Café do Sr.José'
                    },
                    {
                        name: 'Taberna Belga'
                    },
                    {
                        name: 'Bom Jesus'
                    }
                ],
                collections: [
                    {
                        name: 'Verde Cool'
                    },
                    {
                        name: 'Semana da euforia'
                    },
                    {
                        name: 'Enterro da Gata'
                    },
                    {
                        name: 'Receção ao caloiro'
                    },
                ],
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
        methods: {
            submitForm(e) {
                var URL = '';
                let data = new FormData();
                data.append('object', this.object);
                let config = {
                    header: {
                        'Content-Type': 'image/png'
                    }
                };

                console.log(data);
                
                axios.put(
                    URL, 
                    data,
                    config
                ).then(
                    response => {
                        console.log('image upload response > ', response)
                    }
                )
            },
            onFileChange(e) {
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.object.image = e.target.result;
                    console.log(this.object.image);
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
                console.log(e.latlng)
                this.object.position.lattitude = e.latlng.lat;
                this.object.position.longitude = e.latlng.lng;
                this.getAddress()
            },
            async getAddress() {
                this.loading = true;
                let address = "Unresolved address";
                try {
                    var lat = this.object.position.lattitude;
                    var lng = this.object.position.longitude;
                    const result = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
                    );
                    if (result.status === 200) {
                        const body = await result.json();
                        console.log(body)
                        address = body.display_name;
                        //this.object.postal_code = body.address.postcode
                        //this.object.address = body.address.road + ', ' + body.address.house_number
                        //console.log(address)
                    }
                } catch (e) {
                    console.error("Reverse Geocode Error->", e);
                }
                this.loading = false;
                return address;
            },
        },
        mounted() {
        }
    }
 </script>

<style scoped>

h1 {
  padding : 25px;
  margin : auto;
  text-align : center;
}

p {
    font-size: 11px;
}

.card {
    width: 90%;
    margin: 25px auto 25px;
    border-radius: 8px;
    border: 1px solid #d3d3d3;
    box-shadow: 0 0 9px 1px rgba(0, 0, 0, 0.2);
    background-color: white;
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
    text-align: left;
    font-weight: bold;
}

select {
    width: 95%;
    margin: 5px 0px 5px 15px;
    height: 35px;
    font-size: 18px;
    overflow: auto;
    border-radius: 8px;
    border: 1px solid #c8c8c8;
    background-color: #ececec;
    text-indent: 1%;
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
    background-color: #ececec;
}

.input_textfield {
    height: 30px;
    width: 95%;
    margin: 5px 0px 5px 15px;
    padding: 2px;
    border-radius: 8px;
    border: 1px solid #c8c8c8;
    background-color: #ececec;
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
    width: 175px;
    min-height: 50px;
    margin: 10px auto 20px;
    cursor: pointer;
}

</style>