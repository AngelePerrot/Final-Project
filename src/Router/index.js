import Home from '@/views/Home.vue'
import Auth from '@/views/Auth.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import LogIn from '@/components/Auth/LogIn.vue'
import NotFound from '@/views/NotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/Auth', name: 'Auth', component: Auth },
  { path: '/Login', name: 'Login', component: LogIn }, // This should be a child component under auth
  { path: '/About', name: 'About', component: About }, // This should be a child component under auth
  { path: '/Contact', name: 'Contact', component: Contact },
  { path: "/:pathMatch(.*)*" , name: 'NotFound' , component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
