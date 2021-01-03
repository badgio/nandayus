import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js';
import firebase from 'firebase';
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../components/Home.vue')
    },
    {
        path: '/signin',
        name: 'signin',
        component: () => import('../components/SignIn.vue')
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('../components/SignUp.vue')
    },
    /*
        Badges
    */
    {
        path: '/badges',
        name: 'badges',
        component: () => import('../components/Templates.vue'),
        meta: {
            requiresAuth: true,
        },
        props: {
            language: {
                pageTitle: {
                    en: 'Badges',
                    pt: 'Badges',
                },
                filter_text: {
                    en: 'Filter your Badges',
                    pt: 'Filtrar os seus Badges',
                },
                newButton: {
                    en: 'Create New Badge',
                    pt: 'Criar Novo Badge',
                },
            },
            type: 'badges',
            toLink: '/newbadge',
            getLink: 'http://localhost:8001/v0/badges/',
        }
    },
    {
        path: '/badges/:uuid',
        name: 'badges',
        component: () => import('../components/ObjectPage.vue'),
        props: {
            delete_text: {
                en: 'Delete Badge',
                pt: 'Apagar Badge',
            },
            modal_text: {
                certainty:  {
                    en: 'Are you sure that you want to delete this Badge?',
                    pt: 'Tem a certeza que pretende apagar este Badge?',
                },
                yes: {
                    en: 'Yes, I\'m sure.',
                    pt: 'Sim, tenho a certeza.',
                },
                no: {
                    en: 'No, please take me back.',
                    pt: 'Não, por favor recuar.',
                },
            },
            type: {
                path: '/badges',
                en: 'Badge',
                pt: 'o Badge',
            },
            http_requests: {
                getBadges: 'http://localhost:8001/v0/badges/',
                getCollections: 'http://localhost:8001/v0/collections/',
                getLocations: 'http://localhost:8001/v0/locations/',
                getRewards: 'http://localhost:8001/v0/rewards/',
            },
            getLink: 'http://localhost:8001/v0/badges/',
        },
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/newbadge',
        name: 'newbadge',
        component: () => import('../components/Form.vue'),
        meta: {
            requiresAuth: true,
        },
        props: {
            pageTitle: {
                en: 'New Badge',
                pt: 'Novo Badge',
            },
            show_map: false,
            show_image: true,
            show_duration: true,
            get_badges: false,
            obligatory_badge: false,
            get_collections: false,
            obligatory_collection: false,
            get_locations: true,
            obligatory_location: true,
            multiple_locations: false,
            show_location_attributes: false,
            social_networks: false,
            submit_object: {
                en: 'Submit Badge',
                pt: 'Submeter Badge'
            },
            path: '/badges',
            http_request: {
                getLocations: 'http://localhost:8001/v0/locations/',
                getCollections: 'http://localhost:8001/v0/collections/',
            },
            postLink: 'http://localhost:8001/v0/badges/'
        }
    },
    {
        path: '/badges/:uuid/statistics',
        name: 'badgesstatistics',
        component: () => import('../components/Statistics.vue'),
        meta: {
            requiresAuth: true,
        },
        props: {
            languageProp: {
                pageTitle: {
                    en: 'Statistics - Badge ',
                    pt: 'Estatísticas - Badge ',
                },
                totalVisitors: {
                    en: 'Total Nº of Visitors',
                    pt: 'Nº Total de Visitantes',
                },
                nvisitors: {

                    en: 'Nº of Visitors',
                    pt: 'Nº de Visitantes',
                },
                busiestDay: {
                    text: {
                        en: 'Day of the week with more visitors',
                        pt: 'Dia da semana com mais visitantes',
                    },
                },
                customerProfile: {
                    text: {
                        en: 'General customer profile',
                        pt: 'Perfil geral do cliente',
                    },
                },
                nRedeemedRewards: {
                    text: {
                        en: 'Nº of Redeemed Rewards',
                        pt: 'Nº de Recompensas Redimidas',
                    },
                },
                chart: {
                    en: 'Chart',
                    pt: 'Gráfico',
                },
                general: {
                    en: 'General',
                    pt: 'Geral'
                },
                age: {
                    en: 'Age Range',
                    pt: 'Faixa Etária'
                },
                gender: {
                    en: 'Gender',
                    pt: 'Género'
                },
                nationality: {
                    en: 'Nationality',
                    pt: 'Nacionalidade'
                },
                starting_date: {
                    en: 'Starting Date:',
                    pt: 'Data Início:'
                },
                finishing_date: {
                    en: 'Finishing Date:',
                    pt: 'Data Fim:'
                },
                table: {
                    en: 'Table',
                    pt: 'Tabela',
                    location_name: {
                        en: 'Location',
                        pt: 'Local',
                    },
                    n_of_visitors: {
                        en: 'Total Nº of Visitors',
                        pt: 'Nº Total de Visitantes',
                    },
                },
            },
            getLink: 'http://localhost:8001/v0/badges/',
            twoCards: true,
            showTable: false,
        }
    },    
    /*
        Rewards
    */
    {
        path: '/rewards',
        name: 'rewards',
        component: () => import('../components/Templates.vue'),
        props: {
            language: {
                pageTitle: {
                    en: 'Rewards',
                    pt: 'Recompensas',
                },
                filter_text: {
                    en: 'Filter your Rewards',
                    pt: 'Filtrar as suas Recompensas',
                },
                newButton: {
                    en: 'Create New Reward',
                    pt: 'Criar Nova Recompensa',
                },
            },
            toLink: '/newreward',
            type: 'rewards',
            getLink: 'http://localhost:8001/v0/rewards/',

        }
    },
    {
        path: '/rewards/:uuid',
        name: 'rewards',
        component: () => import('../components/ObjectPage.vue'),
        props: {
            delete_text: {
                en: 'Delete Reward',
                pt: 'Apagar Recompensa',
            },
            modal_text: {
                certainty:  {
                    en: 'Are you sure that you want to delete this Reward?',
                    pt: 'Tem a certeza que pretende apagar esta Recompensa?',
                },
                yes: {
                    en: 'Yes, I\'m sure.',
                    pt: 'Sim, tenho a certeza.',
                },
                no: {
                    en: 'No, please take me back.',
                    pt: 'Não, por favor recuar.',
                },
            },
            type: {
                path: '/rewards',
                en: 'Reward',
                pt: 'a Recompensa',
            },
            http_requests: {
                getBadges: 'http://localhost:8001/v0/badges/',
                getCollections: 'http://localhost:8001/v0/collections/',
                getLocations: 'http://localhost:8001/v0/locations/',
                getRewards: 'http://localhost:8001/v0/rewards/',
            },
            getLink: 'http://localhost:8001/v0/rewards/',
        },
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/newreward',
        name: 'newreward',
        component: () => import('../components/Form.vue'),
        props: {
            pageTitle: {
                en: 'New Reward',
                pt: 'Nova Recompensa',
            },
            show_map: false,
            show_image: true,
            show_duration: true,
            get_badges: false,
            obligatory_badge: false,
            get_collections: false,
            obligatory_collection: false,
            get_locations: true,
            obligatory_location: true,
            multiple_locations: false,
            show_location_attributes: false,
            social_networks: false,
            submit_object: {
                en: 'Submit Reward',
                pt: 'Submeter Recompensa'
            },
            path: '/rewards',
            http_request: {
                getLocations: 'http://localhost:8001/v0/locations/',
                getCollections: 'http://localhost:8001/v0/collections/',
            },
            postLink: 'http://localhost:8001/v0/rewards/'
        }
    },
    {
        path: '/rewards/:uuid/statistics',
        name: 'rewardstatistics',
        component: () => import('../components/Statistics.vue'),
        meta: {
            requiresAuth: true,
        },
            props: {
                languageProp: {
                    pageTitle: {
                        en: 'Statistics - Location ',
                        pt: 'Estatísticas - Local ',
                    },
                    totalVisitors: {
                        en: 'Total Nº of Visitors',
                        pt: 'Nº Total de Visitantes',
                    },
                    nvisitors: {
    
                        en: 'Nº of Visitors',
                        pt: 'Nº de Visitantes',
                    },
                    nRedeemedRewards: {
                        text: {
                            en: 'Nº of Redeemed Rewards',
                            pt: 'Nº de Recompensas Redimidas',
                        },
                    },
                    date: {
                        en: 'Date',
                        pt: 'Data'
                    },
                    busiestDay: {
                        text: {
                            en: 'Day of the week with more rewards',
                            pt: 'Dia da semana com mais recompensas',
                        },
                    },
                    customerProfile: {
                        text: {
                            en: 'General customer profile',
                            pt: 'Perfil geral do cliente',
                        },
                    },
                    chart: {
                        en: 'Chart',
                        pt: 'Gráfico',
                    },
                    general: {
                        en: 'General',
                        pt: 'Geral'
                    },
                    age: {
                        en: 'Age Range',
                        pt: 'Faixa Etária'
                    },
                    gender: {
                        en: 'Gender',
                        pt: 'Género'
                    },
                    nationality: {
                        en: 'Nationality',
                        pt: 'Nacionalidade'
                    },
                    starting_date: {
                        en: 'Starting Date:',
                        pt: 'Data Início:'
                    },
                    finishing_date: {
                        en: 'Finishing Date:',
                        pt: 'Data Fim:'
                    },
                    table: {
                        en: 'Table',
                        pt: 'Tabela',
                        location_name: {
                            en: 'Location',
                            pt: 'Local',
                        },
                        n_of_visitors: {
                            en: 'Total Nº of Visitors',
                            pt: 'Nº Total de Visitantes',
                        },
                    },
                },
                getLink: 'http://localhost:8001/v0/rewards/',
                twoCards: true,
                showTable: false,
            }
        },    
    /*
        Locations
    */
    {
        path: '/newlocation',
        name: 'newlocation',
        component: () => import('../components/Form.vue'),
        meta: {
            requiresAuth: true,
        },
        props: {
            pageTitle: {
                en: 'New Location',
                pt: 'Novo Local',
            },
            show_map: true,
            show_image: true,
            show_duration: false,   
            get_badges: false,
            obligatory_badge: false,
            get_collections: false,
            obligatory_collection: false,
            get_locations: false,
            obligatory_location: false,
            multiple_locations: false,
            show_location_attributes: true,
            social_networks: true,
            submit_object: {
                en: 'Submit Location',
                pt: 'Submeter Local'
            },
            path: '/locations',
            postLink: 'http://localhost:8001/v0/locations/'
        }
    },
    {
        path: '/locations',
        name: 'locations',
        component: () => import('../components/Templates.vue'),
        meta: {
            requiresAuth: true,
        },
        props: {
            language: {
                pageTitle: {
                    en: 'Locations',
                    pt: 'Locais',
                },
                filter_text: {
                    en: 'Filter your Locations',
                    pt: 'Filtrar os seus Locais',
                },
                newButton: {
                    en: 'Create New Location',
                    pt: 'Criar Novo Local',
                },
            },
            type: 'locations',
            toLink: '/newlocation',
            getLink: 'http://localhost:8001/v0/locations/',
        },
    },
    {
        path: '/locations/:uuid',
        name: 'locations',
        component: () => import('../components/ObjectPage.vue'),
        props: {
            delete_text: {
                en: 'Delete Location',
                pt: 'Apagar Local',
            },
            modal_text: {
                certainty:  {
                    en: 'Are you sure that you want to delete this Location?',
                    pt: 'Tem a certeza que pretende apagar o Local?',
                },
                yes: {
                    en: 'Yes, I\'m sure.',
                    pt: 'Sim, tenho a certeza.',
                },
                no: {
                    en: 'No, please take me back.',
                    pt: 'Não, por favor recuar.',
                },
            },
            type: {
                path: '/locations',
                en: 'Location',
                pt: 'o Local',
            },
            http_requests: {
                getBadges: 'http://localhost:8001/v0/badges/',
                getCollections: 'http://localhost:8001/v0/collections/',
                getLocations: 'http://localhost:8001/v0/locations/',
                getRewards: 'http://localhost:8001/v0/rewards/',
            },
            getLink: 'http://localhost:8001/v0/locations/',
        },
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/locations/:uuid/statistics',
        name: 'locationsstatistics',
        component: () => import('../components/Statistics.vue'),
        meta: {
            requiresAuth: true,
        },
        props: {
            languageProp: {
                pageTitle: {
                    en: 'Statistics - Location ',
                    pt: 'Estatísticas - Local ',
                },
                totalVisitors: {
                    en: 'Total Nº of Visitors',
                    pt: 'Nº Total de Visitantes',
                },
                nvisitors: {

                    en: 'Nº of Visitors',
                    pt: 'Nº de Visitantes',
                },
                busiestDay: {
                    text: {
                        en: 'Day of the week with more visitors',
                        pt: 'Dia da semana com mais visitantes',
                    },
                },
                customerProfile: {
                    text: {
                        en: 'General customer profile',
                        pt: 'Perfil geral do cliente',
                    },
                },
                nRedeemedRewards: {
                    text: {
                        en: 'Nº of Redeemed Rewards',
                        pt: 'Nº de Recompensas Redimidas',
                    },
                },
                chart: {
                    en: 'Chart',
                    pt: 'Gráfico',
                },
                general: {
                    en: 'General',
                    pt: 'Geral'
                },
                age: {
                    en: 'Age Range',
                    pt: 'Faixa Etária'
                },
                gender: {
                    en: 'Gender',
                    pt: 'Género'
                },
                nationality: {
                    en: 'Nationality',
                    pt: 'Nacionalidade'
                },
                starting_date: {
                    en: 'Starting Date:',
                    pt: 'Data Início:'
                },
                finishing_date: {
                    en: 'Finishing Date:',
                    pt: 'Data Fim:'
                },
                table: {
                    en: 'Table',
                    pt: 'Tabela',
                    location_name: {
                        en: 'Location',
                        pt: 'Local',
                    },
                    n_of_visitors: {
                        en: 'Total Nº of Visitors',
                        pt: 'Nº Total de Visitantes',
                    },
                },
            },
            getLink: 'http://localhost:8001/v0/locations/',
            twoCards: true,
            showTable: false,
        }
    },    
    /*
        Collections
    */
    {
        path: '/collections',
        name: 'collections',
        component: () => import('../components/Templates.vue'),
        meta: {
            requiresAuth: true,
        },
        props: {
            language: {
                pageTitle: {
                    en: 'Collections',
                    pt: 'Coleções',
                },
                filter_text: {
                    en: 'Filter your Collections',
                    pt: 'Filtrar as suas Coleções',
                },
                newButton: {
                    en: 'Create New Collection',
                    pt: 'Criar Nova Coleção',
                },
            },
            type: 'collections',
            toLink: '/newcollection',
            getLink: 'http://localhost:8001/v0/collections/',
            
        }
    },
    {
        path: '/collections/:uuid',
        name: 'collections',
        component: () => import('../components/ObjectPage.vue'),
        props: {
            delete_text: {
                en: 'Delete Collection',
                pt: 'Apagar Coleção',
            },
            modal_text: {
                certainty:  {
                    en: 'Are you sure that you want to delete this Collection?',
                    pt: 'Tem a certeza que pretende apagar esta Coleção?',
                },
                yes: {
                    en: 'Yes, I\'m sure.',
                    pt: 'Sim, tenho a certeza.',
                },
                no: {
                    en: 'No, please take me back.',
                    pt: 'Não, por favor recuar.',
                },
            },
            type: {
                path: '/collections',
                en: 'Collection',
                pt: 'a Coleção',
            },
            http_requests: {
                getBadges: 'http://localhost:8001/v0/badges/',
                getCollections: 'http://localhost:8001/v0/collections/',
                getLocations: 'http://localhost:8001/v0/locations/',
                getRewards: 'http://localhost:8001/v0/rewards/',
            },
            getLink: 'http://localhost:8001/v0/collections/',
        },
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/newcollection',
        name: 'newcollection',
        component: () => import('../components/Form.vue'),
        meta: {
            requiresAuth: true,
        },
        props: {
            pageTitle: {
                en: 'New Collection',
                pt: 'Nova Coleção',
            },
            show_map: false,
            show_image: true,
            show_duration: true,
            get_badges: true,
            obligatory_badge: true,
            get_collections: false,
            obligatory_collection: false,
            get_locations: false,
            multiple_locations: false,
            obligatory_location: false,
            show_location_attributes: false,
            social_networks: true,
            submit_object: {
                en: 'Submit Collection',
                pt: 'Submeter Coleção'
            },
            path: '/collections',
            http_request: {
                getLocations: 'http://localhost:8001/v0/locations/',
                getBadges: 'http://localhost:8001/v0/badges/'
            },
            postLink: 'http://localhost:8001/v0/collections/'
        }
    },
    {
        path: '/collections/:uuid/statistics',
        name: 'collectionsstatistics',
        component: () => import('../components/Statistics.vue'),
        meta: {
            requiresAuth: true,
        },
        props: {
            languageProp: {
                pageTitle: {
                    en: 'Statistics - Collection ',
                    pt: 'Estatísticas - Coleção ',
                },
                totalVisitors: {
                    en: 'Total Nº of Visitors',
                    pt: 'Nº Total de Visitantes',
                },
                nvisitors: {

                    en: 'Nº of Visitors',
                    pt: 'Nº de Visitantes',
                },
                busiestDay: {
                    text: {
                        en: 'Day of the week with more visitors',
                        pt: 'Dia da semana com mais visitantes',
                    },
                },
                customerProfile: {
                    text: {
                        en: 'General customer profile',
                        pt: 'Perfil geral do cliente',
                    },
                },
                nRedeemedRewards: {
                    text: {
                        en: 'Nº of Redeemed Rewards',
                        pt: 'Nº de Recompensas Redimidas',
                    },
                },
                chart: {
                    en: 'Chart',
                    pt: 'Gráfico',
                },
                general: {
                    en: 'General',
                    pt: 'Geral'
                },
                age: {
                    en: 'Age Range',
                    pt: 'Faixa Etária'
                },
                gender: {
                    en: 'Gender',
                    pt: 'Género'
                },
                nationality: {
                    en: 'Nationality',
                    pt: 'Nacionalidade'
                },
                starting_date: {
                    en: 'Starting Date:',
                    pt: 'Data Início:'
                },
                finishing_date: {
                    en: 'Finishing Date:',
                    pt: 'Data Fim:'
                },
                table: {
                    en: 'Table',
                    pt: 'Tabela',
                    location_name: {
                        en: 'Location',
                        pt: 'Local',
                    },
                    n_of_visitors: {
                        en: 'Total Nº of Visitors',
                        pt: 'Nº Total de Visitantes',
                    },
                },
            },
            getLink: 'http://localhost:8001/v0/collections/',
            twoCards: true,
            showTable: true,
        }
    },    
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../components/Profile.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/contact-us',
        name: 'contactform',
        component: () => import('../components/Contact.vue'),
    },
    {
        path: '*',
        name: 'pagenotfound',
        component: () => import('../components/PageNotFound.vue')
    }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
        
        var idToken = store.getters.getToken;

        var storedUser = store.getters.user;

        var currTime = new Date().getTime();

        if (idToken && currTime < storedUser.idTokenValidity) {
            // if idToken exists and token is still valid, then proceed to the desired page
            next();
        }
        else {
            var user = await firebase.auth().currentUser;
            if (user) {
                // user is logged in
                var refToken = await user.getIdToken()
                store.dispatch('setToken',  refToken);
            }
            else {
                // user is not logged in
                next({
                    path: '/signin'
                });
            }
        }
    }
        next();
    }
);

export default router
