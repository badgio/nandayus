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
    path: '/newlocation',
    name: 'newlocation',
    component: () => import('../components/NewLocation.vue')
  },
  {
    path: '/locations',
    name: 'locations',
    component: () => import('../components/Locations.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
