import Vue from 'vue'
//import router from './router.js'
import store from './store.js'
import App from './App.vue'
import VueVisible from 'vue-visible';
 
Vue.use(VueVisible);

new Vue({
  el: '#app',
  //router,
	store,
  render: h => h(App)
})
