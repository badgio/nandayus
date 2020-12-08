import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
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
            toLink: '/newbadge',
            getLink: 'http://localhost:8001/v0/badges/',
        }
    },
    {
        path: '/badge',
        name: 'badge',
        component: () => import('../components/Badge.vue'),
        meta: {
            requiresAuth: true,
        },
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
            show_duration: true,
            show_location_attributes: false,
            show_multiple_collections: true,
            show_multiple_badges: false,
            social_networks: false,
            submit_object: {
                en: 'Submit Badge',
                pt: 'Submeter Badge'
            },
        }
    },
    {
        path: '/statistics/badge',
        name: 'badgesstatistics',
        component: () => import('../components/Statistics.vue'),
        meta: {
            requiresAuth: true,
        },
        props: {
            languageProp: {
                pageTitle: {
                    en: 'Statistics - Badge',
                    pt: 'Estatísticas - Badge',
                },
                totalVisitors: {
                    en: 'Total Nº of Visitors',
                    pt: 'Nº Total de Visitantes',
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
        }
    },
    {
        path: '/reward',
        name: 'reward',
        component: () => import('../components/Reward.vue')
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
            show_duration: true,
            show_location_attributes: false,
            show_multiple_collections: true,
            show_multiple_badges: false,
            social_networks: false,
            submit_object: {
                en: 'Submit Reward',
                pt: 'Submeter Recompensa'
            },
        }
    },
    {
        path: '/statistics/reward',
        name: 'rewardstatistics',
        component: () => import('../components/Statistics.vue'),
        meta: {
            requiresAuth: true,
        },
        props: {
            languageProp: {
                pageTitle: {
                    en: 'Statistics - Reward',
                    pt: 'Estatísticas - Recompensa',
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
            twoCards: false,
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
            show_duration: false,
            show_location_attributes: true,
            show_multiple_collections: false,
            show_multiple_badges: false,
            social_networks: true,
            submit_object: {
                en: 'Submit Location',
                pt: 'Submeter Local'
            },
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
            toLink: '/newlocation',
            getLink: 'http://localhost:8001/v0/locations/',
        },
    },
    {
        path: '/location/:uuid',
        name: 'location',
        component: () => import('../components/Location.vue'),
        meta: {
            requiresAuth: true,
        },
        props: {
            getLink: 'http://localhost:8001/v0/locations/',
        },
    },
    {
        path: '/statistics/location',
        name: 'locationsstatistics',
        component: () => import('../components/Statistics.vue'),
        meta: {
            requiresAuth: true,
        },
        props: {
            languageProp: {
                pageTitle: {
                    en: 'Statistics - Location',
                    pt: 'Estatísticas - Local',
                },
                totalVisitors: {
                    en: 'Total Nº of Visitors',
                    pt: 'Nº Total de Visitantes',
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
            toLink: '/newcollection',
        }
    },
    {
        path: '/collection',
        name: 'collection',
        component: () => import('../components/Collection.vue'),
        meta: {
            requiresAuth: true,
        },
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
            show_duration: true,
            show_location_attributes: false,
            show_multiple_collections: false,
            show_multiple_badges: true,
            social_networks: true,
            submit_object: {
                en: 'Submit Collection',
                pt: 'Submeter Coleção'
            },
        }
    },
    {
        path: '/statistics/collection',
        name: 'collectionsstatistics',
        component: () => import('../components/Statistics.vue'),
        meta: {
            requiresAuth: true,
        },
        props: {
            languageProp: {
                pageTitle: {
                    en: 'Statistics - Collection',
                    pt: 'Estatísticas - Coleção',
                },
                totalVisitors: {
                    en: 'Total Nº of Visitors',
                    pt: 'Nº Total de Visitantes',
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

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
      if (store.getters.user.loggedIn) {
        next();
      } 
      else {
        next(
            {
                path: '/signin'
            }
        );
      }
    }
    next();
  }
);

export default router
