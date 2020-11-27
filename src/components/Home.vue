<template>
    <div>
        <h1>
            {{pageTitle}}
        </h1>
        <ManagementCard
            title="Location Location Test"
            image="https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg"
            v-bind:paragraphs="this.test_paragraphs"
            v-bind:website="this.website"
            v-bind:social_networks="this.socials"
        />
        <ManagementCard
            title="Location Location Test"
            image="https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038"
            v-bind:paragraphs="this.test_paragraphs"
            v-bind:description="this.description"
            v-bind:social_networks="this.socials"
        />
        <ManagementCard
            title="Location Location Test"
            image="https://media.istockphoto.com/photos/cityscape-of-paris-picture-id1176360891"
            v-bind:paragraphs="this.test_paragraphs"
            v-bind:website="this.website"
            v-bind:description="this.description"
            v-bind:social_networks="this.social_networks"
        />
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