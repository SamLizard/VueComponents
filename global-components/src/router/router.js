import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ComponentsView from '../views/ComponentsView.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/components',
    name: 'components',
    component: ComponentsView
  },
]

const router = new VueRouter({
  routes
})

router.push('/home');

export default router
