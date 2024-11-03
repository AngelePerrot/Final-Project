import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import NotFound from '@/views/NotFound.vue'
import Auth from '@/components/Auth/Auth.vue'
import SignIn from '@/components/Auth/SignIn.vue'
import SignUp from '@/components/Auth/SignUp.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Forgot from '@/components/Auth/Forgot.vue'
import UserView from '@/views/ApplicationView.vue'

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
  { path: "/:pathMatch(.*)*" , name: 'NotFound' , component: NotFound },
  { path: '/forgot', name: 'Forgot', component: Forgot },
  { path: '/UserView', name: 'UserView', component: UserView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
