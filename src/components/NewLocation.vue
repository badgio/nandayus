<template>
    <div>
        <div
            class="card"
        >
            <h1>
                {{pageTitle}}
            </h1>
            <v-form
                class = "form"
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
                            Nome do Local:
                        </label>
                        <div>
                            <input
                                class="input_textfield"
                                type="text"
                                id="name_input"
                                name="name_input"
                                v-model="place.name"
                            >
                        </div>
                    </div>
                    <div
                        class = "grid-container-2"
                    >
                        <label
                            for="address_select"
                        >
                            Morada do Local:
                        </label>
                        <div>
                            <input
                                class="input_textfield"
                                type="text"
                                id="address_select"
                                name="address_select"
                                v-model="place.address"
                            >
                        </div>
                    </div>
                    <div
                        class = "grid-container-2"
                    >
                        <label
                            for="type_select"
                        >
                            Escolha um Tipo de Local:
                        </label>
                        <select
                            name="type_select"
                            id="type_select"
                            v-model="place.type"
                        >
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
                            Indique o Código Postal:
                        </label>
                        <input
                            class="input_textfield"
                            type="text"
                            id="postal_code_select"
                            name="postal_code_select"
                            v-model="place.postal_code"
                        >
                    </div>
                    <div
                        class="grid-container-2"
                    >
                        <label
                            for="district_select"
                        >
                            Indique o Distrito:
                        </label>
                        <input
                            class="input_textfield"
                            type="text"
                            id="district_select"
                            name="district_select"
                            v-model="place.district"
                        >
                    </div>
                    <div
                        class="grid-container-2"
                    >
                        <label
                            for="country_select"
                        >
                            Escolha um País:
                        </label>
                        <select
                            name="country_select"
                            id="country_select"
                            v-model="place.country"
                        >
                            <option
                                value=""
                                selected
                                disabled
                            >
                                País
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
                            Descrição:
                        </label>
                        <textarea
                            name="description"
                            id="description_1"
                            class = "desc_textarea"
                            :cols = "60"
                            :rows = "5"
                            v-model="place.description"
                        ></textarea>
                    </div>
                    <br>
                    <div
                        class="grid-container-2"
                    >
                        <label
                            for="myFile"
                        >
                            Imagem:
                        </label>
                        <input
                            type="file"
                            id="myFile"
                            name="filename"
                        >
                    </div>
                    <br>
                    <div
                        class = "grid-container-2"
                    >
                        <div>
                            Site:
                        </div>
                        <div>
                            <input
                                class="input_textfield"
                                type="url"
                                id="site_name_input"
                                name="site_name"
                                v-model="place.website"
                            >
                        </div>
                    </div>
                    <br>
                    <div>
                        <p>
                            Associar redes sociais:
                        </p>
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
                                v-model="place.social_networks.facebook"
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
                                    v-model="place.social_networks.twitter"
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
                                    v-model="place.social_networks.instagram"
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="form_button"
                >
                    <button
                        class="submit_button"
                        type="button"
                    >
                        Submit Place
                    </button>
                </div>
            </v-form>
        </div>
    </div>
</template>

<script>
    
    export default {
        name : "NewLocation",
        components: {
        },
        data: () => {
            return {
                pageTitle: "New Location",
                place_name: '',
                place: {
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
                ]
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

.container {
  padding: 2px 16px;
}

.card {
    border: 1px solid #999;
    border-radius: 5px;
    font-size: 18px;
    margin: 15px auto 0px;
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