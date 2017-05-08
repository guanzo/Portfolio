<template>
	<div id="app">
		<intro></intro>
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
import intro from './components/Intro.vue';
import about from './components/About/About.vue'
import technologies, {scrollfire} from './components/Technologies.vue';
import projects from './components/Projects.vue'
import iconCredits from './components/IconCredit.vue'
import smoothScroll from 'smoothscroll-polyfill'

export default {
	name: 'app',
	components:{
		navbar,
		intro,
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

			var links = this.$el.querySelectorAll('a')
			Array.from(links).forEach(link=>{
				link.addEventListener('click',this.onClickAnchor)
			})
		})
	},
	methods:{
        onClickAnchor(e){
			e.preventDefault();
            var anchor = e.currentTarget.getAttribute('href')
            var node = document.querySelector(anchor);
            var top = node.offsetTop;
            window.scroll({ top , behavior: 'smooth' });
        },
		setScrollFires(){
			//available scrollfire classes in custom.less file
			//add ONLY ONE of these classes to any element
			var options = []
			var regex = new RegExp('scrollfire')
			let defaultOffset = 200;
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
