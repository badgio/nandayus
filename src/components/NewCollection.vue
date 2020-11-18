<template>
    <div
        class="card"
    >
        <h1>
            {{language.pageTitle[this.selected_language]}}
        </h1>
        <form
            class="form"
            id="collectionForm"
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
                        {{language.name[this.selected_language]}}*:
                    </label>
                    <div>
                        <input
                            class="input_textfield"
                            type="text"
                            id="name_input"
                            name="name_input"
                            required
                            v-model="collection.name"
                        >
                    </div>
                </div>
                <br>
                <div>
                    <label
                        for="description_1"
                    >
                        {{language.description[this.selected_language]}}*:
                    </label>
                    <textarea
                        name="description"
                        id="description_1"
                        class = "desc_textarea"
                        :cols = "60"
                        :rows = "5"
                        required
                        v-model="collection.description"
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
                            {{language.image[this.selected_language]}}*:
                        </label>
                        <br>
                        <img
                            v-if="this.collection.image"
                            :src="this.collection.image"
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
                            type="text"
                            id="site_name_input"
                            name="site_name"
                            v-model="collection.website"
                        >
                    </div>
                </div>
                <br>
                <div
                    class="grid-container-2"
                >
                    <label
                        for="state_select"
                    >
                        {{language.validity[this.selected_language]}}*:
                    </label>
                    <div>
                        <input
                            type="radio"
                            id="state_input1"
                            value="permanent"
                            v-model="collection.validity"
                        >
                        <label>
                            {{language.validity.permanent[this.selected_language]}}
                        </label>
                        
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="state_input2"
                            value="temporary"
                            v-model="collection.validity"
                        >
                        <label>
                            {{language.validity.temporary[this.selected_language]}}
                        </label>
                        <div
                            v-if="collection.state=='temporary'"
                        >
                            <br>
                            <label
                                for="beg_label"
                            >
                                {{language.validity.from[this.selected_language]}}
                            </label>
                            <input
                                class="date_input"
                                type="date"
                                name="beg_date"
                                id="beg_date"
                                v-model="collection.beg_date"
                                :min=this.collection.curr_date
                            >
                            <label
                                for="end_label"
                            >
                                {{language.validity.until[this.selected_language]}}
                            </label>
                            <input
                                class="date_input"
                                type="date"
                                name="end_date"
                                id="end_date"
                                v-model="collection.end_date"
                                :min=latest_date
                            >
                        </div>  
                    </div>
                </div>
                <br>
                <div>
                    <h4>
                        {{language.social_networks[this.selected_language]}}
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
                            v-model="collection.social_networks.facebook"
                        >
                    </div>
                    <br>
                    <div
                        class = "grid-container-2"
                    >
                        <label
                            for="tw_input"
                        >
                            Twitter:
                        </label>
                        <div>
                            <input
                                class="input_textfield"
                                type="url"
                                id="tw_input"
                                name="tw"
                                v-model="collection.social_networks.twitter"
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
                            Instagram:
                        </label>
                        <div>
                            <input
                                class="input_textfield"
                                type="url"
                                id="insta_input"
                                name="insta"
                                v-model="collection.social_networks.instagram"
                            >
                        </div>
                    </div>
                </div>
            </div>
            <p>
                {{language.obligatory_warning['en']}}
            </p>
            <div
                class="form_button"
            >
                <button
                    class="submit_button"
                    type="submit"
                >
                    {{language.submit_collection[this.selected_language]}}
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    
    import axios from 'axios';

    export default {
        name : "NewCollection",
        data: () => {
            return {
                language: {
                    pageTitle: {
                        en: "New Collection",
                        pt: 'Nova Coleção',
                    },
                    name: {
                        en: 'Name',
                        pt: 'Nome',
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
                        pt: 'Redes Sociais'
                    },
                    validity: {
                        en: 'Validity',
                        pt: 'Duração',
                        permanent: {
                            en: 'Permanent',
                            pt: 'Permanente',
                        },
                        temporary: {
                            en: 'Temporary',
                            pt: 'Temporária',
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
                    obligatory_warning: {
                        pt: 'Todos os campos assinalados com * são de preenchimento obrigatório.',
                        en: 'All fields signaled by * are required.',
                    },
                    submit_collection: {
                        en: 'Submit Collection',
                        pt: 'Submeter Coleção',
                    },
                },
                collection: {
                    name: '',
                    description: '',
                    image: '',
                    website: '',
                    validity: '',
                    curr_date: '',
                    beg_date: '',
                    end_date:'',
                    social_networks: {
                        facebook: '',
                        instagram: '',
                        twitter: '',
                    }
                },
            }
        },
        created() {
            this.collection.curr_date = new Date().toJSON().slice(0,10);
        },
        computed: {
            selected_language() {
                return this.$store.getters.getLanguage;
            },
            latest_date: function() {
                if (this.collection.curr_date < this.collection.beg_date) return this.collection.beg_date;
                else return this.collection.curr_date;
            }
        },
        methods: {
            submitForm(e) {
                var URL = '';
                let data = new FormData();
                data.append('collection', this.collection);
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
                    this.collection.image = e.target.result;
                    console.log(this.collection.image);
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

.date_input {
    margin: 0px 10px;
    border: 1px solid #999;
    border-radius: 5px;
    box-shadow: 4px 4px #ccc;
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