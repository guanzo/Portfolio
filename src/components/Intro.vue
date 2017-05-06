<template>
    <div id="home">
		<svg class="intro">
			<g v-for="(slide,i) in slides" v-if="i <= index" >
				<defs>
					<linearGradient :id="'gradient'+i" y2="1" x2="0">
						<stop offset=".1" :stop-color="slides[i].gradient[0]" />
						<stop offset=".9" :stop-color="slides[i].gradient[1]" />
					</linearGradient>
					<mask :id="'mask'+i" class="masks">
						<path :d="slide.d" :style="slide.style"></path>
					</mask>
				</defs>

				<svg viewBox="0 0 1000 500" preserveAspectRatio="none">
					<rect width="100%" height="100%" :mask="`url(#mask${i})`" :fill="`url(#gradient${i})`"/>
				</svg>

				<svg viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
					<text :style="slide.textStyle" class="glow" x="50%" y="50%" :mask="`url(#mask${i})`" alignment-baseline="central" v-html="slide.text"></text>
				</svg>
			</g>
		</svg>
	
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
		<svg v-visible="showUI" class="scroll-down" viewBox="0 0 100 100">
			<g>
				<circle r="30" cx="50%" cy="50%"></circle>
				<polyline points="35,38 50,50 65,38"></polyline>
				<polyline points="35,55 50,67 65,55"></polyline>
			</g>
		</svg>
    </div>
</template>

<script>
import * as d3 from 'd3'

export default {
    name:'intro-section',
    data () {
		//viewBox 0 0 1000 500 
		//cubic-bezier(0.645, 0.045, 0.355, 1)
		//above control point coordinates are for 1:1 x/y ratio. 
		//my viewbox has ratio 2:1, so 0.045 = 0.0225, 1 = 0.5
		//then multiplied by 1000 to scale to my viewbox 
		var waveToRight = `M0 0
							h1000
							c645 22.5 355 500 1000 500
							h-2000
							Z`;
		var waveToLeft = `M0 500
							c645 -22.5 355 -500 1000 -500
							h1000
							v500
							Z`;
        return {
            index: 0,
			duration: 3000,
			carat:'35,40 50,52.5 65,40',
			showUI: false,
			slides:[
				{
					text:'Hi, my name is Eric',
					gradient: ['#da7352','#d64759'],//red/orange
					d: waveToRight,
					style:{
						'animation-name':'wave-to-right',
					}
				},
				{
					text:"I'm a full stack developer",
					gradient:['#38aecc','#2E3192'],
					d: waveToLeft,
					style:{
						'animation-name':'wave-to-left',
					}
				},
				{
					text:'I create web applications',
					gradient: ['#12B05B','#005A2A'],
					d: waveToRight,
					style:{
						'animation-name':'wave-to-right',
					}
				},
				{
					text:'Thanks for visiting',
					gradient: ['#A3A1FF ','#3A3897'],//purple
					d: waveToLeft,
					style:{
						'animation-name':'wave-to-left',
					},
					textStyle:{
						'animation-name':'last-slide',
					}
				}
			]
        }
    },
	computed:{

	},
    mounted(){
		setTimeout(()=>this.next(), this.duration)
		setTimeout(()=>this.reveal(), this.duration/2)
    },
    methods:{
        next(){
            this.index++;
            if(this.index + 1 < this.slides.length)
                setTimeout(()=>this.next(), this.duration)
        },
		reveal(){
			this.showUI = true;
			d3.select('.scroll-down g').selectAll('*')
				.attr('stroke-dasharray',function(){return this.getTotalLength()})
				.attr('stroke-dashoffset',function(){return this.getTotalLength()})
				.transition()
				.duration(750)
				.delay((d,i)=>i*200)
				.attr("stroke-dashoffset", 0)
		}
		
    }
}


function tweenDash() {
	var l = this.getTotalLength(),
		i = d3.interpolateString("0," + l, l + "," + l);
	return function(t) { return i(t); };
}
</script>

<style lang="less" scoped>

@import '/assets/custom.less';

@duration: 3s;

.app-section{
    //height: 100vh;
    //display: flex;
    //justify-content: center;
    //align-items: center;
    //text-align: center;
}

#home{
    overflow: hidden;
}

.scroll-down {
	position: absolute;
	left:50%;
	bottom: 0;
	height:90px;
	width:90px;
	transform: translateX(-50%);

	polyline, circle{
		stroke: @offwhite;
	}
	polyline{
		fill:none;
		stroke-width: 1.5px;
		pointer-events: none;
	}
	circle{
		fill:transparent;
		stroke-width: 2.5px;
		cursor: pointer;
		transition: fill 0.5s;
		&:hover{
			fill: rgba(0,0,0,0.2);
		}
	}
}

svg.intro{
	width: 100vw;
	height: 100vh;
	pointer-events: none;
}

text{
    fill: @offwhite;
    text-anchor: middle;
	font-weight: bold;
    font-size: 3rem;
	animation-duration: 4s;
	animation-timing-function: ease-in;
	animation-fill-mode: forwards;
}

.masks path{
	fill: @offwhite;
	will-change: transform;
	animation-duration: @duration;
	animation-fill-mode: forwards;
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

@keyframes wave-to-right {
	from{
		transform: translateX(-100%);
	}
	to{
		transform: translateX(0%);
	}
}
@keyframes wave-to-left {
	from{
		transform: translateX(50%);
	}
	to{
		transform: translateX(-50%);
	}
}

@keyframes last-slide {
	0%{
		opacity: 0;
	}
	50%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}


</style>
