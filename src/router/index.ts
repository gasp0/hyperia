import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HelloWorld from '../views/HelloWorld.vue'
import AddView from '../views/AddView.vue'
import CentersView from '../views/CentersView.vue'
import PatientsView from '../views/PatientsView.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomePage',
    component: HelloWorld,
  },
  {
    path: '/add',
    name: 'AddView',
    component: AddView,
  },
  {
    path: '/centers',
    name: 'Centers',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: CentersView,
  },
  {
    path: '/patients',
    name: 'Patients',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PatientsView,
  },
  {
    path: '/:catchAll(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL + '/upload/hyperia'),
  // history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
