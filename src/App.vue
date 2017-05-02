<template>
	<div id="app">
		<navbar></navbar>
		<intro></intro>
		<technologies></technologies>
		<projects></projects>
	</div>
</template>

<script>
import navbar from './components/Navbar.vue';
import intro from './components/Intro.vue';
import technologies, {scrollfire} from './components/Technologies.vue';
import projects from './components/Projects.vue'

export default {
	name: 'app',
	components:{
		navbar,
		intro,
		technologies,
		projects
	},
	created(){
	}
}

console.log(scrollfire)

</script>

<style lang="less">

@import '/assets/custom.less';

html, body{
	height: 100%;
	width: 100%;
}

body{
    background: #fafafa;
		color: #2c3e50;
		overflow-y: scroll;
}

#app {
	font-family: 'Raleway', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}



</style>
