<template>
    <div>
        <div
            class="card"
        >
            <h1>
                {{language.pageTitle[selected_language]}}
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
                            {{language.name[selected_language]}}
                        </label>
                        <div>
                            <input
                                class="input_textfield"
                                type="text"
                                id="name_input"
                                name="name_input"
                                v-model="badge.name"
                            >
                        </div>
                    </div>
                    <div
                        class = "grid-container-2"
                    >
                        <label
                            for="location_select"
                        >
                            {{language.location[selected_language]}}
                        </label>
                        <select
                            name="location_select"
                            id="location_select"
                            v-model="badge.location"
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
                        <label
                            for="collection_select"
                        >
                            {{language.collection[selected_language]}}
                        </label>
                        <select
                            name="collection_select"
                            id="collection_select"
                            v-model="badge.collection"
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
                    <div
                        class="grid-container-2"
                    >
                        <label
                            for="state_select"
                        >
                            {{language.state[sel]}}
                        </label>
                        <div>
                            <input
                                type="radio"
                                id="state_input1"
                                value="permanent"
                                v-model="badge.validity"
                            >
                            <label>
                                {{language.state.permanent[selected_language]}}
                            </label>
                            
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="state_input2"
                                value="temporary"
                                v-model="badge.validity"
                            >
                            <label
                        >       {{language.state.temporary[selected_language]}}
                            </label>
                            
                        </div>
                    </div>
                    <br>
                    <div>
                        <label
                            for="description_1"
                        >
                            {{language.description[selected_language]}}
                        </label>
                        <textarea
                            name="description"
                            id="description_1"
                            class = "desc_textarea"
                            :cols = "60"
                            :rows = "5"
                            v-model="badge.description"
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
                                {{language.image[selected_language]}}
                            </label>
                            <br>
                            <img
                                v-if="this.badge.image"
                                :src="this.badge.image"
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
                </div>
                <div
                    class="form_button"
                >
                    <button
                        class="submit_button"
                        type="button"
                    >
                        {{language.submit_badge[selected_language]}}
                    </button>
                </div>
            </v-form>
        </div>
    </div>
</template>

<script>
    
    export default {
        name : "NewBadge",
        components: {
        },
        computed: {
            selected_language() {
                return this.$store.getters.getLanguage;
            },
        },
        data: () => {
            return {
                language: {
                    pageTitle: {
                        en: 'New Badge',
                        pt: 'Novo Badge',
                    },
                    name: {
                        en: 'Name',
                        pt: 'Name',
                    },
                    location: {
                        en: 'Location',
                        pt: 'Local',
                    },
                    collection: {
                        en: 'Collection',
                        pt: 'Coleção',
                    },
                    state: {
                        en: 'State',
                        pt: 'Estado',
                        permanent: {
                            en: 'Permanent',
                            pt: 'Permanente',
                        },
                        temporary: {
                            en: 'Temporary',
                            pt: 'Temporário',
                        },
                    },
                    description: {
                        en: 'Description',
                        pt: 'Descrição',
                    },
                    image: {
                        en: 'Image',
                        pt: 'Imagem',
                    },
                    submit_badge: {
                        en: 'Submit Badge',
                        pt: 'Submeter Badge'
                    },
                },
                badge_name: '',
                badge: {
                    name: '',
                    location: '',
                    collection: '',
                    description: '',
                    validity: '',
                    image: '',
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
                this.badge.image = URL.createObjectURL(file);
            }
        }
    }
</script>

<style scoped>

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