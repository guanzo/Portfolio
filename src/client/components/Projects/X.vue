<template>
    <svg viewBox="0 0 100 100">
        <path d="M0 0 L100 100"></path>
        <path d="M0 100 L100 0"></path>
    </svg>
</template>

<script>

import * as d3 from 'd3'

export default{
    name:'x',
    props:['showDelay'],
    mounted(){
        d3.select(this.$el).selectAll('path')
                .attr('stroke-dasharray',function(){return this.getTotalLength()})
				.attr('stroke-dashoffset',function(){return this.getTotalLength()})

        setTimeout(()=>this.draw(), this.showDelay)
    },
    methods:{
        draw(){
            d3.select(this.$el).selectAll('path')
             .transition()
				.duration(500)
				.delay((d,i)=>i*100)
				.attr("stroke-dashoffset", 0)
        }
    }
}
</script>

<style lang="less" scoped>

svg{
    cursor: pointer;
    transition: 0.75s;
    &:hover{
        transform: rotate(90deg);
    }
}

path{
    stroke-width: 4px;
    stroke: #333;
}

</style>