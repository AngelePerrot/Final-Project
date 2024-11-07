import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/HomeView.vue'
import About from '@/views/AboutView.vue'
import Contact from '@/views/ContactView.vue'
import NotFound from '@/views/NotFoundView.vue'

import Auth from '@/components/Authentication/Auth.vue'
import SignIn from '@/components/Authentication/SignIn.vue'
import SignUp from '@/components/Authentication/SignUp.vue'
import Forgot from '@/components/Authentication/Forgot.vue'

import ChristmasPlanner from '@/views/ChristmasPlannerView.vue'
import Profile from '@/views/ProfileView.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  {
    path: '/auth',
    component: Auth,
    children: [
      {
        path: 'signin',
        component: SignIn,
        meta: {
          title: 'Sign In',
        },
      },
      {
        path: 'signup',
        component: SignUp,
        meta: {
          title: 'Sign Up',
        },
      },
    ],
  },
  { path: '/About', name: 'About', component: About },
  { path: '/Contact', name: 'Contact', component: Contact },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  { path: '/forgot', name: 'Forgot', component: Forgot },
  {
    path: '/ChristmasPlanner',
    name: 'ChristmasPlanner',
    component: ChristmasPlanner,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
