import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from '../views/Chat.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    props: {
      test: true
    }
  },
  {
    path: '*',
    redirect: '/login'
  },
]

const router = new VueRouter({
  routes
})

export default router
