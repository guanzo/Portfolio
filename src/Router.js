import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from './components/HomePage.vue'
import ProjectsPage from './components/ProjectsPage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/home', component: HomePage },
  { path: '/projects', component: ProjectsPage },
  { path: '/', redirect: '/home' },

]
//not doing pushstate because i dont have a server to redirect to root.
const router = new VueRouter({
    routes, // short for routes: routes
    linkActiveClass:'active'
})

export default router;