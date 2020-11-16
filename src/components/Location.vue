<template>
    <div
        class="card"
    >
        <div
            class="row"
        >
            <div
                class="col-60"
            >
                <h3>
                    {{this.location.name}}
                </h3>
                <p>
                    Type: {{this.location.type}}
                </p>
                <p>
                    Address: {{this.location.address}}
                </p>
                <p>
                    Postal Code: {{this.location.postal_code}}
                </p>
                <p>
                    District: {{this.location.district}}
                </p>
                <p>
                    Country: {{this.location.country}}
                </p>
            </div>
            <div
                class="col-40"
            >
                <div
                    id="imgPreview"
                >
                    <br>
                    <img
                        src="https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038"
                        width=160px
                        height=135px
                    />
                    <br>
                    <button
                        class="submit_button"
                    >
                        Browse File
                    </button>
                </div>
            </div>
        </div>
        <h6>
            Description:
        </h6>
        <br>
        <textarea
            name="description"
            id="description_1"
            class = "desc_textarea"
            :cols = "60"
            :rows = "4"
            required
            v-model="location.description"
        ></textarea>
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
            Redes Sociais
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
        <button
            class="submit_button"
        >
            Submit Changes
        </button>
    </div>
</template>

<script>
    export default {
        name: 'Location',
        data: () => {
            return {
                pageTitle: "Location",
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
  padding-top : 25px;
}

p {
    font-size: 12px;
}

h3, h6, p {
    margin: 5px 0px 0px 2.5%;
}

.row {
    display: -ms-flexbox; /* IE10 */
    display: flex;
    -ms-flex-wrap: wrap; /* IE10 */
    flex-wrap: wrap;
    max-height: 300px;
    width: 100%;
    margin: 0 auto;
}

.col-40 {
  -ms-flex: 40%; /* IE10 */
  flex: 40%;
}

.col-50 {
  -ms-flex: 50%; /* IE10 */
  flex: 50%;
}

.col-60 {
  -ms-flex: 60%; /* IE10 */
  flex: 60%;
  text-align: center;
}

.col-40,
.col-50,
.col-60 {
    margin: 0 auto 0;
    padding: 0 16px;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
@media (max-width: 650px) {
    .row {
        flex-direction: column-reverse;
        max-height: 500px;
        text-align: center;
        margin: 0 auto;
    }

    .col-40,
    .col-50,
    .col-60 {
        text-align: center;
        margin: 0 auto;
        width: 100%;
    }

    h6 {
        text-align: center;
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

.submit_button {
    border: 1px solid #999;
    border-radius: 5px;
    background-color: #F0F8FF;
    color: black;
    padding: 15px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    font-weight: bold;
    width: 150px;
    height: 50px;
    margin: 0px auto 20px;
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