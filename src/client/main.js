import Vue from 'vue'
//import router from './router.js'
import store from './store.js'
import App from './App.vue'
import VueVisible from 'vue-visible';
import VueWaypoint from 'vue-waypoint';
import './portrait-components'

Vue.use(VueVisible);
Vue.use(VueWaypoint)

new Vue({
  el: '#app',
  //router,
	store,
  render: h => h(App),
})
