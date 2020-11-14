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

    export default {
        name : "NewLocation",
        components: {
        },
        data: () => {
            return {
                pageTitle: "New Location",
                location: {
                    name: '',
                    address: '',
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
                postal_codes : [
                    {
                        number: '4710-340'
                    },
                    {
                        number: '9000-276'
                    }
                ],
                districts: [
                    {
                        name: 'Braga'
                    },
                    {
                        name: 'Região Autónoma da Madeira'
                    }
                ],
                countries: [
                    {
                        name: 'Portugal'
                    },
                    {
                        name: 'Espanha'
                    },
                    {
                        name: 'Portugal'
                    },
                    {
                        name: 'Espanha'
                    },
                    {
                        name: 'Portugal'
                    },
                    {
                        name: 'Espanha'
                    },
                    {
                        name: 'Portugal'
                    },
                    {
                        name: 'Espanha'
                    },
                    {
                        name: 'Portugal'
                    },
                    {
                        name: 'Espanha'
                    },
                    {
                        name: 'Portugal'
                    },
                    {
                        name: 'Espanha'
                    },
                    {
                        name: 'Portugal'
                    },
                    {
                        name: 'Espanha'
                    },
                    {
                        name: 'Portugal'
                    },
                    {
                        name: 'Espanha'
                    },
                    {
                        name: 'Portugal'
                    },
                    {
                        name: 'Espanha'
                    },
                    {
                        name: 'Portugal'
                    },
                    {
                        name: 'Espanha'
                    },
                    {
                        name: 'Portugal'
                    },
                    {
                        name: 'Espanha'
                    },
                    {
                        name: 'Portugal'
                    },
                    {
                        name: 'Espanha'
                    },
                    {
                        name: 'Portugal'
                    },
                    {
                        name: 'Espanha'
                    },
                    {
                        name: 'Portugal'
                    },
                    {
                        name: 'Espanha'
                    },
                    {
                        name: 'Portugal'
                    },
                    {
                        name: 'Espanha'
                    },
                    {
                        name: 'Portugal'
                    },
                    {
                        name: 'Espanha'
                    },
                    {
                        name: 'Portugal'
                    },
                    {
                        name: 'Espanha'
                    },
                ],
                obligatory_warning: {
                   pt: 'Todos os campos assinalados com * são de preenchimento obrigatório.',
                   en: 'All fields signaled by * are required.'
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
            }
        }
    }
</script>

<style>

h1 {
  padding : 25px;
  margin : auto;
  text-align : center;
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