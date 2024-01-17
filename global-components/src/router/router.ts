import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/store';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ComponentsView from '../views/ComponentsView.vue';
import DisplaySearchView from '../views/DisplaySearchView.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/components',
    name: 'components',
    component: ComponentsView
  },
  {
    path: '/displaySearch',
    name: 'displaySearch',
    component: DisplaySearchView
  },
]

const router = new VueRouter({
  routes
})

router.push('/login');

const allowedRoutes = ['home', 'login', 'register'];

router.beforeEach((to: any, from: any, next) => {
  if (store.state.userId === undefined && !allowedRoutes.includes(to.name)) {
    return next(from);
  }

  next();
});

export default router
