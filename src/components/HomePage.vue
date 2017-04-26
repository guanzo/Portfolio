<template>
    <div class="container section">
    	<intro></intro>
		<links></links>
		<technologies></technologies>
	</div>
</template>


<script>
import intro from './Intro.vue';
import links from './Links.vue';
import technologies from './Technologies.vue';

export default {
	name: 'home',
	components:{
		intro,
		links,
		technologies
	},
}
</script>

<style lang="less">
html, body{
	height: 100%;
	width: 100%;
}

body{
    background: #fafafa;
	color: #2c3e50;
}


#app {
	font-family: 'Raleway', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	padding-bottom:50px;
}

.text-center{
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
}
</style>
