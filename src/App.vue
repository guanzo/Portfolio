<template>
	<div id="app">
		<intro></intro>
		<!--<navbar></navbar>
		<intro></intro>
		<technologies></technologies>
		<projects></projects>-->
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
	mounted(){
		//any element you want to scrollfire, just add "scrollfire" class
		//and this function will take care of the rest
		var options = []
		$('.scrollfire').each(function(index){
			let tempClass = 'scrollfire-'+index
			$(this).addClass(tempClass);
			options.push({ selector: '.'+tempClass, offset: -75, callback: scrollFireCallback })
		})
		Materialize.scrollFire(options)
	}
}

function scrollFireCallback(el){
    var $el = $(el)
    $el.addClass('scrollfire-active')
    $el.removeClass('scrollfire')
    $el.one('transitionend',function(){
        $el.off('transitionend')
		$el.attr('class',(i,c)=>c.replace(/(^|\s)scrollfire\S+/g, ''))
    })
}

</script>

<style lang="less">

@import '/assets/custom.less';

html, body{
	height: 100%;
	width: 100%;
}

body{
    background: @charcoal;
	color: @offwhite;
	overflow-y: scroll;
}

#app {
	font-family: 'Raleway', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}



</style>
