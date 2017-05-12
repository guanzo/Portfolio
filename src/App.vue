<template>
	<div id="app" :style="background">
		<about></about>
		<technologies></technologies>
		<projects></projects>
		<!--<navbar></navbar>
		<intro></intro>-->
		<iconCredits></iconCredits>
	</div>
</template>

<script>
import navbar from './components/Navbar.vue';
import about from './components/About/About.vue'
import technologies, {scrollfire} from './components/Technologies.vue';
import projects from './components/Projects.vue'
import iconCredits from './components/IconCredit.vue'
import smoothScroll from 'smoothscroll-polyfill'
import {easeCubicInOut,interpolate} from 'd3'
export default {
	name: 'app',
	data(){
		var g = this.$store.getters.defaultGradient
		return {
			color1: g[0],
			color2: g[1],
			duration: 1500,
			startTime: null,
			interpolator1: null,
			interpolator2: null
		}
	},
	components:{
		navbar,
		about,
		technologies,
		projects,
		iconCredits
	},
	created(){
		smoothScroll.polyfill();

	},
	mounted(){
		this.$nextTick(()=>{
			this.setScrollFires();

			/*var links = this.$el.querySelectorAll('a')
			Array.from(links).forEach(link=>{
				link.addEventListener('click',this.onClickAnchor)
			})*/
		})
	},
	computed:{
		currentGradient(){
			return this.$store.getters.currentGradient
		},
		background(){
			return {
				background: `linear-gradient(to left, ${this.color1} 10%, ${this.color2} 90%)`
			}
		}
	},
	watch:{
		currentGradient(newGradient, oldGradient){
			this.startTime = new Date();
			this.interpolator1 = interpolate(oldGradient[0],newGradient[0])
			this.interpolator2 = interpolate(oldGradient[1],newGradient[1])
			
			requestAnimationFrame(this.draw)
		},
	},
	methods:{
		draw(timestamp){
			var elapsed = new Date() - this.startTime;
			var normalizedTime = Math.min(elapsed,this.duration)/this.duration
			var easedTime = easeCubicInOut(normalizedTime);
			this.color1 = this.interpolator1(easedTime)
			this.color2 = this.interpolator2(easedTime)

			if(elapsed < this.duration)
				requestAnimationFrame(this.draw)
		},
        /*onClickAnchor(e){
			e.preventDefault();
            var anchor = e.currentTarget.getAttribute('href')
            var node = document.querySelector(anchor);
            var top = node.offsetTop;
            window.scroll({ top , behavior: 'smooth' });
        },*/
		setScrollFires(){
			//available scrollfire classes in custom.less file
			//add ONLY ONE of these classes to any element
			var options = []
			var regex = new RegExp('scrollfire')
			let defaultOffset = 100;
			$('[class*="scrollfire"]').each(function(index){
				var $this = $(this);
				let scrollfireType = $this.attr('class').split(' ').find(c=>regex.test(c))
				let tempClass = 'scrollfire-'+index
				$this.addClass(tempClass);
				$this.attr('data-scrollfire-type',scrollfireType)
				let customOffset = $this.data('scrollfire-offset')
				let offset = customOffset ? customOffset : defaultOffset;

				if(scrollfireType === 'scrollfire-to-top')
					offset -= 75; //offset the translateY

				options.push({ selector: '.'+tempClass, offset, callback: scrollFireCallback })
			})
			Materialize.scrollFire(options)
		}
	}

}

function scrollFireCallback(el){
    var $el = $(el)
    $el.addClass('scrollfire-active')
	let classToRemove = $el.attr('data-scrollfire-type')
	let delay = $el.attr('data-scrollfire-delay') || 0;

	setTimeout(()=>$el.removeClass(classToRemove), delay)
    	
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
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

body{
    background: @charcoal;
	color: @offwhite;
	overflow-y: scroll;
}

#app {
	overflow-x: hidden;
}



</style>
