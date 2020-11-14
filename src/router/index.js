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
]

const router = new VueRouter({
  routes
})

export default router
