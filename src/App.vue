<template>
	<div id="app">
		<intro></intro>
		<about></about>
		<!--<navbar></navbar>
		<intro></intro>
		<technologies></technologies>
		<projects></projects>-->
	</div>
</template>

<script>
import navbar from './components/Navbar.vue';
import intro from './components/Intro.vue';
import about from './components/About.vue'
import technologies, {scrollfire} from './components/Technologies.vue';
import projects from './components/Projects.vue'

export default {
	name: 'app',
	components:{
		navbar,
		intro,
		about,
		technologies,
		projects
	},
	mounted(){
		//any element you want to scrollfire, just add "scrollfire" class
		//and this function will take care of the rest
		var options = []
		var regex = new RegExp('scrollfire')
		$('*[class*="scrollfire"]').each(function(index){
			var $this = $(this);
			let scrollfireType = $this.prop('class').split(' ').find(c=>regex.test(c))
			let tempClass = 'scrollfire-'+index
			$this.addClass(tempClass);
			$this.attr('data-scrollfire-type',scrollfireType)
			let offset = scrollfireType === 'scrollfire-to-top' ? -75 : 150;
			options.push({ selector: '.'+tempClass, offset, callback: scrollFireCallback })
		})
		Materialize.scrollFire(options)
	}
}

function scrollFireCallback(el){
    var $el = $(el)
    $el.addClass('scrollfire-active')
	let classToRemove = $el.attr('data-scrollfire-type')
    $el.removeClass(classToRemove)
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
	overflow-x: hidden;
}



</style>
