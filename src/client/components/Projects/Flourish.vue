<template>
    <div :style="flourish"></div>
</template>

<script>
//extravagant, over the top, and most likely unnecessary 
//gradient visuals for the project gallery.

//the very first flourish will wait for the gallery lights to turn on
//subsequent flourishes will occur on background gradient changes

import * as d3 from 'd3'
export default {
    name:'flourish',
    props:['galleryIndex','firstFlourishDone'],
    data(){

        var hide = {
            a1: 180,//angle
            a2: 180,
            a3: 180,
            p1: 100,//percent
            p2: 100,
            p3: 100
        }

        return {
            values:{
                current: Object.assign({},hide),
                hide,
                show:{
                    a1: 120,//angle
                    a2: 110,
                    a3: 103,
                    p1: 87,//percent
                    p2: 85,
                    p3: 84
                }
            },
            flourishDuration: 2500,
            startTime: null,
            interpolators:{}
        }
    },
    computed:{
        flourish(){
            var {a1,a2,a3,p1,p2,p3} = this.values.current
            return {
                'background-image':`
                    linear-gradient(-${a1}deg, rgba(255, 255, 255, 0) ${p1}%, rgba(0,0,0,.06) 15%), 
					linear-gradient(-${a2}deg, rgba(255, 255, 255, 0) ${p2}%, rgba(0,0,0,0.03) 15%), 
					linear-gradient(-${a3}deg, rgba(255, 255, 255, 0) ${p3}%, rgba(0,0,0,0.02) 15%),
					linear-gradient(${a1}deg, rgba(255, 255, 255, 0) ${p1}%, rgba(0,0,0,.06) 15%), 
					linear-gradient(${a2}deg, rgba(255, 255, 255, 0) ${p2}%, rgba(0,0,0,0.03) 15%), 
					linear-gradient(${a3}deg, rgba(255, 255, 255, 0) ${p3}%, rgba(0,0,0,0.02) 15%), 
					linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(0,0,0,0) 100%)`
            }
        },
        globalGradientIndex(){
            return this.$store.state.gradientIndex;
        },
        galleryIsInView(){
            return this.globalGradientIndex == this.galleryIndex;
        }
    },
    watch:{
        globalGradientIndex(){
            if(this.firstFlourishDone)
                this.gradientFlourish()
        },
        firstFlourishDone(){
            this.gradientFlourish()
        }
    },
    methods:{
        gradientFlourish(){
            this.startTime = new Date();
            this.interpolators = {};
            var values = this.values;
            var from = values.current;
            var to = this.galleryIsInView ? values.show : values.hide;

            Object.keys(values.current).forEach(key=>{
                let start = from[key]
                let end = to[key]
                this.interpolators[key] = d3.interpolate(start,end);
            })
			requestAnimationFrame(this.draw)
        },
        draw(){
			var elapsed = new Date() - this.startTime;
			var normalizedTime = Math.min(elapsed,this.flourishDuration)/this.flourishDuration
			var easedTime = d3.easeCubicInOut(normalizedTime);

            Object.keys(this.values.current).forEach(key=>{
                this.values.current[key] = this.interpolators[key](easedTime);
            })

			if(elapsed < this.flourishDuration)
				requestAnimationFrame(this.draw)
		},
    }
}

</script>

<style lang="less" scoped>

div{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
}

</style>