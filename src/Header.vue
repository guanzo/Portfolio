<template>
    <header>
        <div ref="themeContainer" class="toggle-theme">
            <span ref="light" :class="isLight ? 'active' : ''" @click="lightTheme">Light</span>
            <span>/</span>
            <span ref="dark" :class="isLight ? '' : 'active'" @click="darkTheme">Dark</span>
            <span ref="indicator" class="indicator"></span>
        </div>
        <svg class="matrix"></svg>
    </header>
</template>

<script>
import Vue from 'vue'
import * as d3 from "d3";

export default {
	data () {
		return {
			isLight: true,
		}
	},
    mounted(){
        Vue.nextTick(()=>{
            this.showActive();
        })
    },
    methods:{
        lightTheme(){
            if(this.isLight)
                return;
            this.isLight = true;
            document.body.className = "light-theme"
            this.showActive();
            //this.divideScreenIntoMatrix();
        },
        darkTheme(){
            if(!this.isLight)
                return;
            this.isLight = false;
            document.body.className = "dark-theme"
            this.showActive();
            //this.divideScreenIntoMatrix();

        },
        divideScreenIntoMatrix(){
            var w = window.innerWidth;
            var h = window.innerHeight;
            var size = 50;
            var columns = Math.ceil(w/50);
            var rows = Math.ceil(h/50);

            var matrix = [];
            for(let i=0; i<rows; i++) {
                matrix[i] = Array(columns).fill(size);
            }

            let row = 0;
            let count = 0;

            d3.select('svg.matrix')
                .selectAll('g')
                    .data(matrix)
                .enter().append('g')
                .selectAll('rect')
                    .data(d=>d)
                .enter().append('rect')
                .attr('class','square')
                .attr('width',`${size}px`)
                .attr('height',`${size}px`)
                .attr("x", (d,i)=>i*50)
                .attr("y", function(d, i){
                    if(count > 0 && count % columns == 0){
                        row++;
                        count = 0;
                    }
                    count++;
                    return row*size;
                })
            
            d3.selectAll('.square')
                .transition()
                .duration(()=>Math.floor(Math.random() * 750) + 250 )
                .delay(()=> Math.floor(Math.random() * 750) + 250 )
                .style('opacity',0);

        },
        showActive(){
            var containerWidth = this.$refs.themeContainer.clientWidth; 
            var activeNode = this.isLight ? this.$refs.light : this.$refs.dark;
            
            var left = activeNode.offsetLeft
            var right = containerWidth - (left + activeNode.clientWidth)

            var indicator = this.$refs.indicator;
            if(indicator.offsetLeft < left){//slide right
                indicator.style.right = right +'px';
                setTimeout(()=>indicator.style.left = left +'px', 100)
            }else{//slide left
                indicator.style.left = left +'px';
                setTimeout(()=>indicator.style.right = right +'px', 100)
            }
        },
    }
}
</script>

<style lang="less">
/*
#455a64 blue-grey darken-2
#37474f blue-grey darken-3
#263238 blue-grey darken-4
*/
body{
    transition: background-color 10s ease-out, color 10s ease-out;
}
body.light-theme{
    background: #fafafa;
	color: #2c3e50;
}

body.dark-theme{
    background: #262626;
    color: white;

    .technology{
        //background: white;
        box-shadow: 0 2px 2px 0 white, 0 1px 5px 0 white, 0 3px 1px -2px white;
    }
}

rect.square{
    fill: white;
}
</style>

<style scoped lang="less">

header{
    height:30px;
    margin-bottom:40px;
}


.matrix{
    position: absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
    z-index: -1;
    pointer-events: none;
}


.toggle-theme{
    position:absolute;
    right: 5px;
    top: 5px;
    span{
        display: inline-block;
        cursor: pointer;
    }
    .indicator{
        position: absolute;
        bottom:0;
        transition: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        height:2px;
        background: #333;
        left:0;
        right:100%;
    }
}

</style>
