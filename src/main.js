import Vue from 'vue'
//import router from './router.js'
import store from './store.js'
import App from './App.vue'
import VueVisible from 'vue-visible';
import VueWaypoint from 'vue-waypoint';

Vue.use(VueVisible);
Vue.use(VueWaypoint)
/*
I've decided to have a little robot butler i can interact with around the page.
Just for some flavor. Everytime we talk, i'll show these 2 image components.
Register globally so i don't have to import all the time.
*/

Vue.component('man',{
  render(createElement){
    return createElement(
      'img',
      {
        attrs:{
          src:'assets/images/man.svg'
        }
      }
    )
  }
})

Vue.component('robot',{
  render(createElement){
    return createElement(
      'img',
      {
        attrs:{
          src:'assets/images/robot.svg'
        }
      }
    )
  }
})

new Vue({
  el: '#app',
  //router,
	store,
  render: h => h(App),
})
