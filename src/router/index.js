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
    path: '/profile',
    name: 'profile',
    component: () => import('../components/Profile.vue')
  },
  {
    path: '/badges',
    name: 'badges',
    component: () => import('../components/Badges.vue')
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
    component: () => import('../components/Locations.vue')
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
    component: () => import('../components/Collections.vue')
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
]

const router = new VueRouter({
  routes
})

export default router
