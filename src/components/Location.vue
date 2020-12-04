<template>
    <div>
        <ManagementCard
            title="Location Location Test"
            image="https://media.istockphoto.com/photos/cityscape-of-paris-picture-id1176360891"
            v-bind:paragraphs="this.test_paragraphs"
            v-bind:website="this.website"
            v-bind:description="this.test_description"
            v-bind:social_networks="this.socials"
        />
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

    import ManagementCard from './ManagementCard.vue';

    export default {
        name: 'Location',
        components: {
            ManagementCard,
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
                },
                test_paragraphs: [
                    {
                        type: {
                            en: 'Description',
                            pt: 'Descrição',
                        },
                        text: 'Text Text Text Test Text Text Text Test Text Text Text Test Text Text Text Test'
                    },
                    {
                        type: {
                            en: 'Description',
                            pt: 'Descrição',
                        },
                        text: 'Text Text Text Test Text Text Text Test Text Text Text Test Text Text Text Test'
                    },
                    {
                        type: {
                            en: 'Description',
                            pt: 'Descrição',
                        },
                        text: 'Text Text Text Test Text Text Text Test Text Text Text Test Text Text Text Test'
                    },
                    {
                        type: {
                            en: 'Description',
                            pt: 'Descrição',
                        },
                        text: 'Text Text Text Test Text Text Text Test Text Text Text Test Text Text Text Test'
                    },
                ],
                test_description: 'Testerino descriptionerino',
                website: 'Location\'s website',
                socials: [
                    {
                        name: 'Instagram',
                        link: '',
                    },
                    {
                        name: 'Facebook',
                        link: 'facebook.com/test',
                    },
                    {
                        name: 'Twitter',
                        link: '',
                    },
                ],
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