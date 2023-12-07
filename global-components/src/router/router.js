import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/*',
    name: 'home',
    component: HomeView
  },
]

const router = new VueRouter({
  routes
})

router.push('/*');

export default router
