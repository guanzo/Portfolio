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
						<transition name="intro-circle" appear>
						<circle ref="circle" r="45%" cx="50%" cy="50%" 
						:stroke-dasharray="strokeDashArray" :class="current.class" :style="current.style">
						</circle>
						</transition>
						<transition :name="current.textTransition" appear>
							<text class="glow" x="50%" y="50%" alignment-baseline="central" v-html="current.text" :key="current.text"></text>
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

import * as d3 from 'd3'

export default {
    name:'intro-section',
    data () {
        return {
            index: 0,
			delay: 2500,
			slides:[
				{
					text:'Hi, my name is Eric',
					gradient: ['#d64759','#da7352'],//red/orange
				},
				{
					text:"I'm a full stack developer",
					gradient: ['#38aecc','#347fb9'],//blue
				},
				{
					text:'I make interactive websites',
					gradient: ['#FFFF96','#009E00'],//green
				},
				{
					text:'Thanks for visiting',
					gradient: ['#3A3897 ','#A3A1FF'],//purple
				}
			]
        }
    },
    computed:{
		current(){
			return this.slides[this.index]
		},
    },
    mounted(){
		
		//setTimeout(()=>this.nextText(), this.current.duration)
    },
    methods:{
        nextText(){
            this.index++;
            if(this.index + 1 < this.transforms.length)
                setTimeout(()=>this.nextText(), this.current.duration)
        },
		circlePath(cx, cy, r){
			return 'M '+cx+' '+cy+' m -'+r+', 0 a '+r+','+r+' 0 1,0 '+(r*2)+',0 a '+r+','+r+' 0 1,0 -'+(r*2)+',0';
		},
		describeArc(x, y, radius, startAngle, endAngle){

			var start = this.polarToCartesian(x, y, radius, endAngle);
			var end = this.polarToCartesian(x, y, radius, startAngle);

			var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

			var d = [
				"M", start.x, start.y, 
				"A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
			].join(" ");

			return d;       
		},
		polarToCartesian(centerX, centerY, radius, angleInDegrees) {
			var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

			return {
				x: centerX + (radius * Math.cos(angleInRadians)),
				y: centerY + (radius * Math.sin(angleInRadians))
			};
		},
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
