<template>
    <div
        class="card"
    >
        <h1>
            {{pageTitle}}
        </h1>
        <form
            class="form"
            id="locationForm"
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
                        Name*:
                    </label>
                    <div>
                        <input
                            class="input_textfield"
                            type="text"
                            id="name_input"
                            name="name_input"
                            required
                            v-model="location.name"
                        >
                    </div>
                </div>
                <label
                    for="map"
                >
                    Map*:
                </label>
                <p>
                    {{mapAdvisory['en']}}
                </p>
                <p
                    v-if="location.position.lattitude && location.position.longitude"
                >
                    {{curr_lattitude['en']}} {{this.location.position.lattitude.toFixed(3)}} {{curr_longitude['en']}} {{this.location.position.longitude.toFixed(3)}}
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
                            v-if="location.position.lattitude && location.position.longitude"
                            :lat-lng="[location.position.lattitude, location.position.longitude]"
                        >
                        </l-marker>
                    </l-map>
                </div>
                <div
                    class = "grid-container-2"
                >
                    <label
                        for="address_select"
                    >
                        Address*:
                    </label>
                    <div>
                        <input
                            class="input_textfield"
                            type="text"
                            id="address_select"
                            name="address_select"
                            required
                            v-model="location.address"
                        >
                    </div>
                </div>
                <div
                    class = "grid-container-2"
                >
                    <label
                        for="type_select"
                    >
                        Location Type*:
                    </label>
                    <select
                        name="type_select"
                        id="type_select"
                        required
                        v-model="location.type"
                    >
                        <option
                            value=""
                            selected
                            disabled
                        >
                            Location Type
                        </option>
                        <option
                            v-for="type in types"
                            :key=type.index
                            :value="type.name"
                        >
                            {{type.name}}
                        </option>
                    </select>
                </div>
                <div
                    class="grid-container-2"
                >
                    <label
                        for="postal_code_select"
                    >
                        Postal Code*:
                    </label>
                    <input
                        class="input_textfield"
                        type="text"
                        id="postal_code_select"
                        name="postal_code_select"
                        required
                        v-model="location.postal_code"
                    >
                </div>
                <div
                    class="grid-container-2"
                >
                    <label
                        for="district_select"
                    >
                        District*:
                    </label>
                    <input
                        class="input_textfield"
                        type="text"
                        id="district_select"
                        name="district_select"
                        required
                        v-model="location.district"
                    >
                </div>
                <div
                    class="grid-container-2"
                >
                    <label
                        for="country_select"
                    >
                        Country*:
                    </label>
                    <select
                        name="country_select"
                        id="country_select"
                        required
                        v-model="location.country"
                    >
                        <option
                            value=""
                            selected
                            disabled
                        >
                            Country
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
                <br>
                <div>
                    <label
                        for="description_1"
                    >
                        Description*:
                    </label>
                    <textarea
                        name="description"
                        id="description_1"
                        class = "desc_textarea"
                        :cols = "60"
                        :rows = "5"
                        required
                        v-model="location.description"
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
                            Image*:
                        </label>
                        <br>
                        <img
                            v-if="this.location.image"
                            :src="this.location.image"
                            width=320px
                            height=270px
                        />
                        <br>
                        <input
                            type="file"
                            id="myFile"
                            name="filename"
                            required
                            v-on:change="onFileChange"
                        >
                    </div>
                </div>
                <br>
                <div
                    class = "grid-container-2"
                >
                    <h4>
                        Website:
                    </h4>
                    <div>
                        <input
                            class="input_textfield"
                            type="url"
                            id="site_name_input"
                            name="site_name"
                            v-model="location.website"
                        >
                    </div>
                </div>
                <br>
                <div>
                    <h4>
                        Social Networks:
                    </h4>
                    <br>
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
                            v-model="location.social_networks.facebook"
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
                                v-model="location.social_networks.twitter"
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
                                v-model="location.social_networks.instagram"
                            >
                        </div>
                    </div>
                </div>
            </div>
            <p>
                {{obligatory_warning['en']}}
            </p>
            <div
                class="form_button"
            >
                <button
                    class="submit_button"
                    type="submit"
                >
                    Submit Place
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
        data: () => {
            return {
                pageTitle: "New Location",
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
                location: {
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
                    website: '',
                    social_networks: {
                        facebook: '',
                        instagram: '',
                        twitter: '',
                    }
                },
                types: [
                    {
                        name: 'Atração Turística'
                    },
                    {
                        name: 'Estabelecimento Comercial'
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
                obligatory_warning: {
                   pt: 'Todos os campos assinalados com * são de preenchimento obrigatório.',
                   en: 'All fields signaled by * are required.'
                },
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
            }
        },
        methods: {
            submitForm(e) {
                var URL = '';
                console.log('All gucci')
                let data = new FormData();
                data.append('image', this.location.image);
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
                    this.location.image = e.target.result;
                    console.log(this.location.image);
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
            innerClick() {
                alert("Click!");
            },
            addMarker(e) {
                console.log(e.latlng)
                this.location.position.lattitude = e.latlng.lat;
                this.location.position.longitude = e.latlng.lng;
                this.getAddress()
            },
            async getAddress() {
                this.loading = true;
                let address = "Unresolved address";
                try {
                    var lat = this.location.position.lattitude;
                    var lng = this.location.position.longitude;
                    const result = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
                    );
                    if (result.status === 200) {
                        const body = await result.json();
                        console.log(body)
                        address = body.display_name;
                        //this.location.postal_code = body.address.postcode
                        //this.location.address = body.address.road + ', ' + body.address.house_number
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

<style>

h1 {
  padding : 25px;
  margin : auto;
  text-align : center;
}

p {
    font-size: 11px;
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
    border: 1px solid #999;
    border-radius: 5px;
    text-indent: 1%;
    width: 100%;
    height: 50px;
    margin: 0 auto 15px;
    color: black;
    box-shadow: 4px 4px #ccc;
    font-size: 18px;
    overflow: auto;
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
    width: 100%;
    align-self: center;
    border: 1px solid #999;
    border-radius: 5px;
    box-shadow: 4px 4px #ccc;
    text-indent: 1%;
}

.input_textfield {
    width: 100%;
    height: 50px;
    margin: 0 auto 15px;
    text-align: left;
    border: 1px solid #999;
    border-radius: 5px;
    box-shadow: 4px 4px #ccc;
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
    height: 50px;
    margin: 10px auto 20px;
    cursor: pointer;
}

</style>