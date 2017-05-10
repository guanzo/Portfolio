<template>
    <div class="root">
		<svg class="intro">
			<g v-for="(slide,i) in slides" v-if="i <= index" >
				<defs>
					<linearGradient :id="'gradient'+i" y2="1" x2="0">
						<stop offset=".1" :stop-color="slides[i].gradient[0]" />
						<stop offset=".9" :stop-color="slides[i].gradient[1]" />
					</linearGradient>
					<mask :id="'mask'+i" class="masks">
						<path :d="slide.d" :transform="slide.transform"></path>
					</mask>
				</defs>

				<svg viewBox="0 0 1000 500" preserveAspectRatio="none">
					<rect width="100%" height="100%" :mask="`url(#mask${i})`" :fill="`url(#gradient${i})`"/>
				</svg>

				<svg viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
					<text :style="slide.textStyle" class="glow":mask="`url(#mask${i})`" x="50%" y="50%"  alignment-baseline="central" v-html="slide.text"></text>
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
		<a href="#about" class="scroll-down"  @click="onClick">
			<svg v-visible="showUI" viewBox="0 0 100 100">
				<g>
					<path class="circle" :d="circlePath(50,50,45)"></path>
					<path d="M30 35 L 50 50 L 70 35"></path>
					<path d="M30 55 L 50 70 L 70 55"></path>
				</g>
			</svg>
		</a>
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
			showUI: false,
			slides:[
				{
					text:"Hi, my name is Eric",
					gradient: ['#da7352','#d64759'],//red/orange
					d: waveToRight,
					transform:'translate(-2000,0)',
					transformTo:'translate(0,0)'
				},
				{
					text:"I'm a full stack developer",
					gradient:['#38aecc','#2E3192'],
					d: waveToLeft,
					transform:'translate(1000,0)',
					transformTo:'translate(-1000,0)'
				},
				{
					text:'I create web applications',
					gradient: ['#12B05B','#005A2A'],
					d: waveToRight,
					transform:'translate(-2000,0)',
					transformTo:'translate(0,0)'
				},
				{
					text:'Thanks for visiting',
					gradient: ['#A3A1FF ','#3A3897'],//purple
					d: waveToLeft,
					transform:'translate(1000,0)',
					transformTo:'translate(-1000,0)',
					textStyle:{
						'animation-name':'last-slide',
					}
				}
			]
        }
    },
	computed:{
		currentSlide(){
			return this.slides[this.index]
		}
	},
    mounted(){
		this.slideMask();
		setTimeout(()=>this.next(), this.duration)
		setTimeout(()=>this.reveal(), 2000)
    },
    methods:{
        next(){
            this.index++;
			this.slideMask();
            if(this.index + 1 < this.slides.length)
                setTimeout(()=>this.next(), this.duration)
        },
		slideMask(){
			let slide = this.currentSlide;
			var duration = this.duration;
            var interpolator = d3.interpolateString(slide.transform, slide.transformTo)
            var t = d3.timer((elapsed)=>{
                var normalizedTime = Math.min(elapsed,duration)/duration
                var easedTime = d3.easeCubicInOut(normalizedTime);
                slide.transform = interpolator(easedTime);
				
                if (elapsed > duration) 
                    t.stop();
            });
		},
		reveal(){
			this.showUI = true;
			d3.select('.scroll-down g').selectAll('path')
				.attr('stroke-dasharray',function(){return this.getTotalLength()})
				.attr('stroke-dashoffset',function(){return this.getTotalLength()})
				.transition()
				.duration(750)
				.delay((d,i)=>i*200)
				.attr("stroke-dashoffset", 0)
		},
		circlePath(cx, cy, r){
			return 'M '+cx+' '+cy+' m -'+r+', 0 a '+r+','+r+' 0 1,0 '+(r*2)+',0 a '+r+','+r+' 0 1,0 -'+(r*2)+',0';
		},
		onClick(e){
			e.preventDefault();
            var anchor = e.currentTarget.getAttribute('href')
            var node = document.querySelector(anchor);
            var top = node.offsetTop;
            window.scroll({ top , behavior: 'smooth' });
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

.root{
    height: 100vh;
	font-family: 'Raleway', sans-serif;
}


.scroll-down {
	position: absolute;
	left:50%;
	bottom: 5px;
	transform: translateX(-50%);
	display: inline-block;
	height:60px;
	width:60px;

	path, .circle{
		stroke: @offwhite;
	}
	path{
		fill:none;
		stroke-width: 5px;
		pointer-events: none;
	}
	.circle{
		fill:transparent;
		pointer-events: fill;
		stroke-width: 2.5px;
		transition: fill 0.5s;
		&:hover{
			fill: rgba(0,0,0,0.2);
		}
	}
}

svg.intro{
	width:100%;
	height:100vh;
	pointer-events: none;
}

text{
    fill: @offwhite;
    text-anchor: middle;
	font-weight: bold;
    font-size: 3rem;
	animation-duration: 4s;
	animation-timing-function: ease-in;
}

.masks path{
	fill: white;
	will-change: transform;
}

.glow{
    filter: url('#glow');
}

svg.global-defs{
    visibility: hidden;
    width:0px;
    height:0px;
    position: absolute;
}


@keyframes last-slide {
	0%{
		opacity: 0;
	}
	60%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}


</style>
