<template>
    <div id="home">
		<svg>
			<g v-for="(slide,i) in slides" v-if="i <= index" >
				<svg viewBox="0 0 1000 500" preserveAspectRatio="none">
					<defs>
						<linearGradient :id="'gradient'+i" y2="1" x2="0">
							<stop offset=".1" :stop-color="slides[i].gradient[0]" />
							<stop offset=".9" :stop-color="slides[i].gradient[1]" />
						</linearGradient>
						<mask :id="'mask'+i" class="masks">
							<path :d="slide.d" :style="slide.style"></path>
						</mask>
					</defs>
					<rect width="100%" height="100%" :mask="`url(#mask${i})`" :fill="`url(#gradient${i})`"/>
				</svg>
				<svg viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
					<text class="glow" x="50%" y="50%" :mask="`url(#mask${i})`" alignment-baseline="central" v-html="slide.text"></text>
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
    </div>
</template>

<script>
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
					gradient: ['#3A3897 ','#A3A1FF'],//purple
					d: waveToLeft,
					style:{
						'animation-name':'wave-to-left',
					}
				}
			]
        }
    },
    mounted(){
		setTimeout(()=>this.next(), this.duration)
    },
    methods:{
        next(){
            this.index++;
            if(this.index + 1 < this.slides.length)
                setTimeout(()=>this.next(), this.duration)
        },
		
    }
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

svg{
	width: 100vw;
	height: 100vh;
	pointer-events: none;
}

text{
    fill: white;
    text-anchor: middle;
	font-weight: bold;
    font-size: 3rem;
}

.masks path{
	fill: white;
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
</style>
