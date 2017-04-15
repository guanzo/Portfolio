<template>
  <div id="app">
	<appheader></appheader>
	<div class="container">
    	<intro></intro>
		<links></links>
		<technologies></technologies>
		<projects></projects>
	</div>
  </div>
</template>

<script>
import appheader from './Header.vue';
import intro from './Intro.vue';
import links from './Links.vue';
import technologies from './Technologies.vue';
import projects from './Projects.vue';

export default {
	name: 'app',
	data () {
		return {
			showLinks: false
		}
	},
	components:{
		intro,
		links,
		technologies,
		appheader,
		projects
	},
	mounted(){
		setTimeout(()=>this.showLinks = true, 6000)
	}
}
</script>

<style lang="less">
html, body{
	height: 100%;
	width: 100%;
}
#app {
	font-family: 'Raleway', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}

.text-left{
	text-align: left;
}

.section{
	padding: 15px 0px;
	
	.section-title{
		margin-bottom: 5px;
	}
	.section-subtitle{
		margin-bottom: 10px;
	}
}
</style>
