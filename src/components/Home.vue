<template>
    <div>
        <h1>
            {{pageTitle}}
        </h1>
    </div>
</template>

<script>

    import ManagementCard from './ManagementCard.vue';
    
    export default {
        name: "Home",
        components: {
            ManagementCard,
        },
        data: () => {
            return {
                pageTitle: "Home",
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
                description: 'Dasdfadasdasdasdasdasdasdasdasdasd',
                website: 'asdasdasda',
                socials: [],
                social_networks: [
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
                ]
            }
        },
    }
</script>