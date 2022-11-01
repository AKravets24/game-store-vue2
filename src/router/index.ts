import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Registration from '@/pages/Registration.vue'
import Main from "@/pages/Main/Main.vue";
import Cart from "@/pages/Cart.vue";
import About from "@/pages/about/About.vue";
import User from "@/pages/User/User.vue";
import Page404 from "@/pages/404/404.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: '/',
    redirect: '/main' },
  {
    path: '/main',
    name: 'main',
    component: Main,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration,
  },
  {
    path: '/profile',
    name: 'profile',
    component: User,
  },
  {
    path: '*',
    name: 'page404',
    component: Page404,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
