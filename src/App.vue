<template>
	<div id="app">
	<navbar></navbar>
	<transition name="fade-page">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</transition>
	</div>
</template>

<script>
import navbar from './components/Navbar.vue';
export default {
	name: 'app',
	components:{
		navbar,
	},
}
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

.text-center{
	text-align: center;
}

.text-left{
	text-align: left;
}

.section{
	padding-top: 1rem;
	padding-bottom: 1rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

.fade-page-enter-active, .fade-page-leave-active {
  transition: opacity .25s;
}

.fade-page-enter-active {
  transition-delay: .30s;
}
.fade-page-enter, .fade-page-leave-active {
  opacity: 0
}
</style>
