<template>
    <div>
        <div
            class="card location_card"
        >
            <div
                class="left_col_75"
            >
                <h3>
                    {{this.location.name}}
                </h3>
                <p>
                    {{language.type[this.selected_language]}}: {{this.location.type}}
                </p>
                <p>
                    {{language.address[this.selected_language]}}: {{this.location.address}}
                </p>
                <p>
                    {{language.postal_code[this.selected_language]}}: {{this.location.postal_code}}
                </p>
                <p>
                    {{language.district[this.selected_language]}}: {{this.location.district}}
                </p>
                <p>
                    {{language.country[this.selected_language]}}: {{this.location.country}}
                </p>
                <h6>
                    {{language.description[this.selected_language]}}
                </h6>
                <textarea
                    name="description"
                    id="description_1"
                    class = "desc_textarea"
                    :cols = "60"
                    :rows = "4"
                    required
                    v-model="location.description"
                ></textarea>
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
            <br>
            <input
                class="input_textfield"
                type="url"
                id="site_name_input"
                name="site_name"
                v-model="location.website"
            >
            <br>
            <h6>
                {{language.social_networks[this.selected_language]}}
            </h6>
            <p>
                Facebook:
            </p>
            <input
                class="input_textfield"
                type="url"
                id="fb_input"
                name="fb"
                v-model="location.social_networks.facebook"
            >
            <p>
                Twitter:
            </p>
            <input
                class="input_textfield"
                type="url"
                id="tw_input"
                name="tw"
                v-model="location.social_networks.twitter"
            >
            <p>
                Instagram:
            </p>
            <input
                class="input_textfield"
                type="url"
                id="insta_input"
                name="insta"
                v-model="location.social_networks.instagram"
            >
        </div>
        <div
            class="row"
        >
            <button
                class="submit_button"
            >
                {{language.submit_changes[this.selected_language]}}
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Location',
        data: () => {
            return {
                pageTitle: "Location",
                language: {
                    type: {
                        en: 'Type',
                        pt: 'Tipo',
                    },
                    address: {
                        en: 'Address',
                        pt: 'Morada',
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
                    browse_file: {
                        en: 'Browse File',
                        pt: 'Carregar Ficheiro',
                    },
                    description: {
                        en: 'Description',
                        pt: 'Descrição',
                    },
                    social_networks: {
                        en: 'Social Networks',
                        pt: 'Redes Sociais',
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
                location: {
                    name: 'Location Location Location',
                    address: 'Main Street, number 1',
                    type: 'Touristic Atraction',
                    postal_code: '4700-300',
                    district: 'Braga',
                    country: 'Portugal',
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
                ],
            }
        },
        computed: {
            selected_language() {
                return this.$store.getters.getLanguage;
            }
        },
        methods: {
            submitForm(e) {
                console.log('All gucci')
            },
            onFileChange(e) {
                const file = e.target.files[0];
                this.location.image = URL.createObjectURL(file);
            }
        }
    }
</script>

<style scoped>

* {
  box-sizing: border-box;
  color: #0a4870;
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

.card {
    width: 85%;
    margin: 0 auto;
    background-color: #eee;
    border: 2px solid teal;
    border-radius: 5px;
}

.location_card {
    height: 300px;
    display: grid;
    grid-auto-columns: 60% 40%;
}

.location_card > .left_col_75 > textarea {
    margin-left: 10px;
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

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
@media (max-width: 650px) {
    .card {
        width: 95%;
    }

    .location_card {
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

.row {
    width: 100%;
    display: flex;
    justify-content: center;
}

.row > button {
    border: 1px solid #999;
    border-radius: 5px;
    background-color: #F0F8FF;
    color: black;
    padding: 15px 15px;
    text-align: center;
    text-decoration: none;
    font-size: 12px;
    font-weight: bold;
    width: 150px;
    margin: 10px auto;
    cursor: pointer;
}

.desc_textarea {
    width: 95%;
    margin: 0 auto;
    border: 1px solid #999;
    border-radius: 5px;
    box-shadow: 4px 4px #ccc;
    text-indent: 1%;
}

.input_textfield {
    width: 95%;
    height: 35px;
    margin: 0 auto 15px;
    text-align: left;
    border: 1px solid #999;
    border-radius: 5px;
    box-shadow: 4px 4px #ccc;
    text-indent: 1%;
}

</style>