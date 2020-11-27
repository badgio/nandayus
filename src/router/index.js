import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
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
  {
    path: '/badges',
    name: 'badges',
    component: () => import('../components/Templates.vue'),
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
    component: () => import('../components/Badge.vue')
  },
  {
    path: '/newbadge',
    name: 'newbadge',
    component: () => import('../components/NewBadge.vue')
  },
  {
    path: '/newlocation',
    name: 'newlocation',
    component: () => import('../components/NewLocation.vue')
  },
  {
    path: '/locations',
    name: 'locations',
    component: () => import('../components/Templates.vue'),
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
    }
  },
  {
    path: '/location',
    name: 'location',
    component: () => import('../components/Location.vue')
  },
  {
    path: '/statistics/location',
    name: 'locationstatistics',
    component: () => import('../components/LocationStatistics.vue')
  },
  {
    path: '/collections',
    name: 'collections',
    component: () => import('../components/Templates.vue'),
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
    component: () => import('../components/Collection.vue')
  },
  {
    path: '/newcollection',
    name: 'newcollection',
    component: () => import('../components/NewCollection.vue')
  },
  {
    path: '/statistics/collection',
    name: 'collectionstatistics',
    component: () => import('../components/CollectionStatistics.vue')
  },  
  {
    path: '/statistics/badge',
    name: 'badgesstatistics',
    component: () => import('../components/BadgeStatistics.vue')
  },
  {
      path: '/contact-us',
      name: 'contactform',
      component: () => import('../components/Contact.vue')
  },
    {
        path: '/form1', // Badge
        name: 'form',
        component: () => import('../components/Form.vue'),
        props: {
            pageTitle: {
                en: 'New Badge',
                pt: 'Novo Badge',
            },
        }
    },
    {
        path: '/form2', // Collection
        name: 'form',
        component: () => import('../components/Form.vue')
    },
    {
        path: '/form3', // Location
        name: 'form',
        component: () => import('../components/Form.vue')
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

export default router
