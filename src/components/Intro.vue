<template>
    <div class="root">
		<canvas ref="canvas"></canvas>
		<a href="#about" class="scroll-down"  @click="onClick">
			<svg v-visible="showUI" viewBox="0 0 100 100">
				<g>
					<path class="circle" :d="circlePath(50,50,45)"></path>
					<path d="M30 35 L 50 50 L 70 35"></path>
					<path d="M30 55 L 50 70 L 70 55"></path>
				</g>
			</svg>
		</a>
	<!--
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
        </svg>-->
    </div>
</template>

<script>
import * as d3 from 'd3'
import Vue from 'vue'
import throttle from 'lodash/throttle'

export default {
    name:'intro-section',
    data () {
        return {
            index: 0,
			duration: 3000,
			width:0,
			height:0,
			ctx:null,
			interpolator:null,
			startTime:0,
			showUI: false,
			slides:[
				{
					text:"Hi, my name is Eric",
					gradient: ['#da7352','#d64759'],//red/orange
				},
				{
					text:"I'm a full stack developer",
					gradient:['#38aecc','#2E3192'],
				},
				{
					text:'I create web applications',
					gradient: ['#12B05B','#005A2A'],
				},
				{
					text:'Thanks for visiting',
					gradient: ['#A3A1FF ','#3A3897'],//purple
				}
			]
        }
    },
	computed:{
		midX(){
			return this.width/2
		},
		midY(){
			return this.height/2
		},
		clipToRightStartOrigin(){
			return 0 - this.width*2
		},
		xScale(){
			return d3.scaleLinear().range([0,this.width])
		},
		yScale(){
			return d3.scaleLinear().range([0,this.height])
		}
	},
    mounted(){
		Vue.nextTick(()=>{
			this.setCanvasSize();
			var canvas = this.$refs.canvas
			this.interpolator = d3.interpolateNumber(0,this.width)
			this.ctx = canvas.getContext('2d')
			this.startTime = new Date()

			requestAnimationFrame(this.draw)
		})

		setTimeout(()=>this.reveal(), 2000)

		window.addEventListener('resize',throttle(this.setCanvasSize,100))
    },
    methods:{
        draw(){
			var {ctx, index, startTime, interpolator,duration,width,height} = this;
            var elapsed = new Date() - startTime;
			var normalizedTime = Math.min(elapsed,duration)/duration
			var easedTime = d3.easeCubicInOut(normalizedTime);
			var interpolatedWidth = interpolator(easedTime)
			
			if(index == 0){
				ctx.fillStyle='#373737'
				ctx.fillRect(0,0,width,height)
			}else
				this.background(index-1)
			
			ctx.save();

			if(index%2 == 0)
				this.animateClipToRight(interpolatedWidth)
			else
				this.animateClipToLeft(interpolatedWidth)
			this.background(index)
			ctx.restore()
			
			if(elapsed < duration)
				requestAnimationFrame(this.draw)
			else if(index + 1 < this.slides.length){
				this.index++;
				this.startTime = new Date()
				requestAnimationFrame(this.draw)
			}
        },
		animateClipToRight(interpolatedWidth){
			var {ctx, clipToRightStartOrigin, width,height,xScale:x, yScale:y} = this;

			var currentOrigin = clipToRightStartOrigin + interpolatedWidth*2
			var rectTopRight = currentOrigin + width
			var curveBotRight = rectTopRight + width
			ctx.beginPath()
			ctx.moveTo(currentOrigin,0)
			ctx.lineTo(rectTopRight, 0)
			//cubic-bezier(0.645, 0.045, 0.355, 1) cubicInOut
			ctx.bezierCurveTo(rectTopRight + x(.645), y(0.045), 
							  rectTopRight + x(0.355), y(1),
							  curveBotRight,height);
			ctx.lineTo(currentOrigin, height)
			ctx.clip();
		},
		animateClipToLeft(interpolatedWidth){
			var {ctx, clipToRightStartOrigin, width, height,xScale:x, yScale:y} = this;

			var clipToLeftStartOrigin = width;
			var currentOrigin = clipToLeftStartOrigin - interpolatedWidth*2
			var rectTopLeft = currentOrigin + width
  			var rectTopRight = rectTopLeft + width

			ctx.beginPath()
			ctx.moveTo(currentOrigin,height)
  			ctx.bezierCurveTo(currentOrigin + x(.645), y(.955),//1 - 0.045
								currentOrigin + x(0.355), y(0),//1 - 1
								rectTopLeft,0);
			ctx.lineTo(rectTopRight, 0)
			ctx.lineTo(rectTopRight, height)
			ctx.clip();
		},
		background(index){
			var {ctx, width,height,midX,midY} = this;
			var slide = this.slides[index]
			var gradient = ctx.createLinearGradient(midX,0,midY,height)
			gradient.addColorStop(.1, slide.gradient[0]);
			gradient.addColorStop(.9, slide.gradient[1]);
			
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, width, height);
			
			ctx.textAlign="center"
			ctx.fillStyle='white'
			ctx.font="bold 60px Raleway";
			ctx.shadowColor="white"
			ctx.shadowBlur="10"
			ctx.fillText(slide.text,midX,midY);
		},
		setCanvasSize(){
			var canvas = this.$refs.canvas
			this.width = canvas.width = window.innerWidth;
			this.height = canvas.height = window.innerHeight
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
