import Vue from 'vue'
//import router from './router.js'
import store from './store.js'
import App from './App.vue'
import VueVisible from 'vue-visible';
import VueWaypoint from 'vue-waypoint';

Vue.use(VueVisible);
Vue.use(VueWaypoint)

Vue.component('man',{
	render(createElement){
		return createElement(
			'svg',{
				attrs:{
					class:'speech-portrait z-depth-1 circle',
					width:'50',
					height:'50'
				},
			}, [
				createElement('use',{
					attrs: {
					'xlink:href':'#man-svg'
					}
				})
			]
		)
	}
})

Vue.component('robot',{
	render(createElement){
		return createElement(
		'img',
			{
				attrs:{
					class:'speech-portrait',
					src:'/images/robot.svg'
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
