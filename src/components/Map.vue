<template>
    <div>
        <label
            for="map"
        >
            {{language.map[selected_language]}}*
        </label>
        <p>
            {{language.mapAdvisory[selected_language]}}
        </p>
        <p
            v-if="location.position.lattitude && location.position.longitude"
        >
            {{language.curr_lattitude[selected_language]}} {{this.location.position.lattitude.toFixed(3)}} {{language.curr_longitude[selected_language]}} {{this.location.position.longitude.toFixed(3)}}
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
    </div>
</template>

<script>

    import axios from 'axios';
    import { latLng } from "leaflet";
    import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
    import { OpenStreetMapProvider } from 'leaflet-geosearch';
    import VGeosearch from 'vue2-leaflet-geosearch';

    export default {
        name: 'Map',
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
                    social_networks: {
                        en: 'Social Networks',
                        pt: 'Redes Sociais',
                    },
                    submit_location: {
                        en: 'Submit Location',
                        pt: 'Submeter Local'
                    },
                    obligatory_warning: {
                        pt: 'Todos os campos assinalados com * são de preenchimento obrigatório.',
                        en: 'All fields signaled by * are required.'
                    },
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
        computed: {
            selected_language() {
                return this.$store.getters.getLanguage;
            },
        },
        methods: {
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

label {
    text-align: left;
    font-weight: bold;
}

.map_container {
    height: 500px;
    width: 85%;
    margin: 20px auto 20px;
    border: 2px solid #0a4870;
    border-radius: 5px;
}

</style>