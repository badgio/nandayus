<template>
    <div
        class="card"
    >
        <h1>
            {{pageTitle[selected_language]}}
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
                        {{language.name[selected_language]}}*:
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
                <Map />
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
                        {{language.type[selected_language]}}*:
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
                        v-model="location.postal_code"
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
                        v-model="location.district"
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
                        v-model="location.country"
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
                            {{language.image[selected_language]}}*:
                        </label>
                        <img
                            v-if="this.location.image"
                            :src="this.location.image"
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
                        {{language.social_networks[selected_language]}}
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
                {{language.obligatory_warning[selected_language]}}
            </p>
            <div
                class="form_button"
            >
                <button
                    class="submit_button"
                    type="submit"
                >
                    {{language.submit_location[selected_language]}}
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    
    import axios from 'axios';
    import Map from './Map.vue';

    export default {
        name : "NewLocation",
        components: {
            Map,
        },
        props: {
            pageTitle: {
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
            }
        },
        computed: {
            selected_language() {
                return this.$store.getters.getLanguage;
            },
        },
        methods: {
            submitForm(e) {
                var URL = '';
                let data = new FormData();
                data.append('location', this.location);
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
        },
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