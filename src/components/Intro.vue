<template>
    <div id="home">
        <div class="app-section container">
                <svg viewBox="0 0 600 600">
                    <defs>
                        <linearGradient id="gradient" y2="1" x2="0">
                            <stop offset="0" :stop-color="current.gradient[0]" />
                            <stop offset="1" :stop-color="current.gradient[1]" />
                        </linearGradient>
                        <mask id="mask">
							<transition name="intro-circle-fade" v-on:enter="enter" appear>
							<circle ref="circle" r="45%" cx="50%" cy="50%" 
								:style="current.style" :stroke-opacity="current.strokeOpacity" :stroke-dasharray="strokeDashArray">
							</circle>
							</transition>
           					<transition name="intro-fade" appear>
                            	<text class="glow" x="50%" y="50%" alignment-baseline="central" v-html="current.text"></text>
							</transition>
                        </mask>
                    </defs>
                    <rect width="100%" height="100%" mask="url(#mask)" fill="url(#gradient)"/>
                </svg>
        </div>
        
        <svg class="global-defs">
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"></feGaussianBlur>
                    <feMerge>
                        <feMergeNode in="coloredBlur"></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                </filter>
            </defs>
        </svg>
    </div>
</template>

<script>
/*

    <transition name="hand">
        <i v-if="showHand" :class="icons[iconIndex]" class="fa fa-3x" aria-hidden="true"></i>
    </transition>
*/
import * as d3 from 'd3'
export default {
    name:'intro-section',
    data () {
        return {
            index: 0,
            delay: 2500,
			totalLength: 0,
			transforms:[
				{
					text:'Hi, my name is Eric',
					gradient: ['#d64759','#da7352'],//red/orange
					dasharrayDivisor: 4,
					strokeOpacity: 1,
					style: {
						transform: 'rotate(-45deg)'
					}
				},
				{
					text:"I'm a full stack developer",
					gradient: ['#38aecc','#347fb9'],//blue
					dasharrayDivisor: 4,
					strokeOpacity: 1,
					style: {
						transform: 'rotate(-45deg)'
					}
				},
				{
					text:'I make interactive websites',
					gradient: ['#FFFF96','#009E00'],//green
					dasharrayDivisor: 4,
					strokeOpacity: 1,
					style: {
						transform: 'rotate(-45deg)'
					}
				},
				{
					text:'Thanks for visiting',
					gradient: ['#3A3897 ','#A3A1FF'],//purple
					dasharrayDivisor: 4,
					strokeOpacity: 1,
					style: {
						transform: 'rotate(-45deg)'
					}
				}
			]
        }
    },
    computed:{
		current(){
			return this.transforms[this.index]
		},
		strokeDashArray(){
			return this.totalLength/this.current.dasharrayDivisor
		},
    },
    mounted(){
		this.totalLength = this.$refs.circle.getTotalLength();
    },
    methods:{
        nextText(){
            this.index++;
            if(this.index + 1 < this.texts.length)
                setTimeout(()=>this.nextText(), this.delay)
        },
		enter(circle){
			d3.select(circle).classed('transition-ready',true)
			//console.log(arguments)
			/*var circle = d3.select(this.$refs.circle)
			circle//.attr('stroke-opacity',0)
				  .attr("stroke-dashoffset", this.totalLength)
				  .classed('transition-ready',true)*/
		},
        afterEnter(){
            var circle = d3.select(this.$refs.circle)
			var totalLength = circle.node().getTotalLength();
			//circle
				//.attr("stroke-dasharray", totalLength/4)
				//.attr("stroke-dashoffset", totalLength)
				//.style('stroke-opacity',1)
				/*.transition()
					.duration(2000)
					//.ease(d3.easePolyOut)
					.attr("stroke-dashoffset", 0)
					.style('stroke-opacity',1)
					.on('end',()=>{
						this.nextText();
					})*/
        }
    }
}
</script>

<style lang="less" scoped>

@import '/assets/custom.less';

@duration: 2.5s;

.app-section{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

#home{
    position: relative;
}

svg{
    overflow: visible;
    width: 75vmin;
    height: 75vmin;
	stop{
		transition: @duration;
	}
}

text{
    fill: white;
    text-anchor: middle;
    font-size: 2.5rem;
}

circle{
    stroke: white;
	//stroke-opacity: 0;
    stroke-width: 10px;
    stroke-linecap: round;
    //transform: rotate(-45deg);
    transform-origin: 50% 50%;
	&.transition-ready{
		transition: @duration;
	}
}

.glow{
    filter: url('#glow');
}

svg.global-defs{
    visibility: hidden;
    pointer-events: none;
    width:0px;
    height:0px;
    position: absolute;
}

</style>
