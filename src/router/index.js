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
            prov_data: [
            {
                name: 'Badge #1',
                statistics: {
                    url: '/statistics/badge',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url:'/badge',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/newbadge',
                image_link: "https://media.istockphoto.com/photos/empty-coffee-shop-picture-id1154756901",
            },
            {
                name: 'Badge #2',
                statistics: {
                    url: '/statistics/badge',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url:'/badge',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/newbadge',
                image_link: "https://media.istockphoto.com/photos/this-cafes-got-a-little-something-for-everyone-picture-id520497828",
            },
            {
                name: 'Badge #3',
                statistics: {
                    url: '/statistics/badge',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url:'/badge',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/newbadge',
                image_link: "https://media.istockphoto.com/photos/old-church-picture-id816378880",
            },
            {
                name: 'Badge #4',
                statistics: {
                    url: '/statistics/badge',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url:'/badge',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/newbadge',
                image_link: "https://images.pexels.com/photos/137038/pexels-photo-137038.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            },
            {
                name: 'Badge #5',
                statistics: {
                    url: '/statistics/badge',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url:'/badge',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/newbadge',
                image_link: "https://i.redd.it/lefp60p4bky51.jpg",
            },
            {
                name: 'Badge Badge Badge Badge Badge #6',
                statistics: {
                    url: '/statistics/badge',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url:'/badge',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/newbadge',
                image_link: "https://i.redd.it/8f8ync5fkhy51.jpg",
            },
            ]
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
            prov_data: [
            {
                name: 'Reward #1',
                statistics: {
                    url: '/statistics/reward',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url:'/reward',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/newreward',
                image_link: "https://media.istockphoto.com/photos/empty-coffee-shop-picture-id1154756901",
            },
            {
                name: 'Reward #2',
                statistics: {
                    url: '/statistics/reward',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url:'/reward',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/newreward',
                image_link: "https://media.istockphoto.com/photos/this-cafes-got-a-little-something-for-everyone-picture-id520497828",
            },
            {
                name: 'Reward #3',
                statistics: {
                    url: '/statistics/reward',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url:'/reward',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/newreward',
                image_link: "https://media.istockphoto.com/photos/old-church-picture-id816378880",
            },
            {
                name: 'Reward #4',
                statistics: {
                    url: '/statistics/reward',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url:'/reward',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/newreward',
                image_link: "https://images.pexels.com/photos/137038/pexels-photo-137038.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            },
            ]
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
            prov_data: [
                {
                name: 'Location #1',
                statistics: {
                    url: '/statistics/location',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url: '/location',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/location',
                image_link: "https://media.istockphoto.com/photos/empty-coffee-shop-picture-id1154756901",
            },
            {
                name: 'Location #2',
                statistics: {
                    url: '/statistics/location',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url: '/location',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/location',
                image_link: "https://media.istockphoto.com/photos/this-cafes-got-a-little-something-for-everyone-picture-id520497828",
            },
            {
                name: 'Location #3',
                statistics: {
                    url: '/statistics/location',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url: '/location',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/location',
                image_link: "https://media.istockphoto.com/photos/old-church-picture-id816378880",
            },
            {
                name: 'Location #4',
                statistics: {
                    url: '/statistics/location',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url: '/location',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/location',
                image_link: "https://images.pexels.com/photos/137038/pexels-photo-137038.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            },
            {
                name: 'Location #5',
                statistics: {
                    url: '/statistics/location',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url: '/location',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/location',
                image_link: "https://i.redd.it/lefp60p4bky51.jpg",
            },
            {
                name: 'Location Location Location Location Location #6',
                statistics: {
                    url: '/statistics/location',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url: '/location',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/location',
                image_link: "https://i.redd.it/8f8ync5fkhy51.jpg",
            },
            ]
        },
    },
    {
        path: '/location',
        name: 'location',
        component: () => import('../components/Location.vue'),
        meta: {
            requiresAuth: true,
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
            prov_data: [
            {
                name: 'Collection #1',
                statistics: {
                    url: '/statistics/collection',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url:'/collection',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/newcollection',
                image_link: "https://media.istockphoto.com/photos/empty-coffee-shop-picture-id1154756901",
            },
            {
                name: 'Collection #2',
                statistics: {
                    url: '/statistics/collection',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url:'/collection',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/newcollection',
                image_link: "https://media.istockphoto.com/photos/this-cafes-got-a-little-something-for-everyone-picture-id520497828",
            },
            {
                name: 'Collection Collection Collection Collection Collection Collection Collection Collection Collection Collection Collection #3',
                statistics: {
                    url: '/statistics/collection',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url:'/collection',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/newcollection',
                image_link: "https://media.istockphoto.com/photos/old-church-picture-id816378880",
            },
            {
                name: 'Collection #4',
                statistics: {
                    url: '/statistics/collection',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url:'/collection',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/newcollection',
                image_link: "https://images.pexels.com/photos/137038/pexels-photo-137038.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            },
            {
                name: 'Collection #5',
                statistics: {
                    url: '/statistics/collection',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url:'/collection',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/newcollection',
                image_link: "https://i.redd.it/lefp60p4bky51.jpg",
            },
            {
                name: 'Collection Collection Collection Collection Collection #6',
                statistics: {
                    url: '/statistics/collection',
                    text: {
                        en: 'Statistics',
                        pt: 'Estatísticas'
                    }
                },
                management: {
                    url:'/collection',
                    text: {
                        en: 'Management',
                        pt: 'Gestão'
                    }
                },
                url: '/newcollection',
                image_link: "https://i.redd.it/8f8ync5fkhy51.jpg",
            },
            ]
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
