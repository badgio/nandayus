<template>
    <div>
        <ManagementCard
            v-bind:title="this.location.name"
            v-bind:image="this.location.image"
            v-bind:paragraphs="this.location.paragraphs"
            v-bind:website="this.location.website"
            v-bind:description="this.location.description"
            v-bind:social_networks="this.location.social_networks"
            v-bind:delete_text="this.language.delete_text"
            v-bind:delete_link="this.getLink + this.$route.params.uuid"
            v-bind:redirect_link="'/locations'"
        />
        <div
            class="row"
        >
            <button
                class="submit_button"
                v-on:click="submitForm"
            >
                {{language.submit_changes[this.selected_language]}}
            </button>
        </div>
    </div>
</template>

<script>

    import ManagementCard from './ManagementCard.vue';
    import axios from 'axios';
    import firebase from 'firebase';

    export default {
        name: 'Location',
        components: {
            ManagementCard,
        },
        props: {
            getLink: {
                type: String,
                required: true,
            },
        },
        async created() {
            var idToken = '';

            await firebase
                .auth()
                .currentUser
                .getIdToken(true)
                .then(
                    function(res) {
                        idToken = res
                    }
                );

            await axios
                .get(this.getLink + this.$route.params.uuid, {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-type': 'application/json',
                            authorization: 'Bearer ' + idToken
                        },
                    }
                )
                .then((res) => {
                       var loc = res.data;
                       this.location.name = loc.name;
                       this.location.image = loc.image;
                       this.location.paragraphs = [
                            {
                                type: {
                                    en: 'Status',
                                    pt: 'Estado',
                                },
                                text: loc.status,
                            },
                            {
                                type: {
                                    en: 'Type',
                                    pt: 'Tipo',
                                },
                                text: 'Tourist Attraction',
                            },
                       ]
                       this.location.website = loc.website;
                       this.location.description = loc.description;
                       this.location.social_networks = [
                            {
                                name: 'Facebook',
                                link: loc.facebook,
                            },
                            {
                                name: 'Instagram',
                                link: loc.instagram,
                            },
                       ]
                    }
                )
                .catch((err) => {
                        console.error(err)
                    }
                );
        },
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
                    delete_text: {
                        pt: 'Apagar Local',
                        en: 'Delete Location',
                    },
                },
                location: {
                    name: '',
                    paragraphs: [],
                    description: '',
                    image: '',
                    website: '',
                    social_networks: []
                },
            }
        },
        computed: {
            selected_language() {
                return this.$store.getters.getLanguage;
            }
        },
        methods: {
            submitForm(e) {
                console.log(this.location)
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
    margin: 10px auto 10px;
    border-radius: 5px;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
@media (max-width: 650px) {
    .card {
        width: 95%;
    }
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

</style>