<template>
    <svg>
        <defs>
            <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"></feGaussianBlur>
                <feMerge>
                    <feMergeNode in="coloredBlur"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                </feMerge>
            </filter>
        </defs>
    </svg>
</template>

<script>

import * as d3 from 'd3'

export default {
    name:'stream',
    mounted(){
        
        var n = 7, // number of layers
            m = 7, // number of samples per layer
            k = 20, // number of bumps per layer
            duration = 8500,
            colors = ['#133453','#728DA5','#303C74','#07103A']

        var data = d3.transpose(d3.range(n).map(()=>bumps(m, k)))

        var stack = d3.stack().keys(d3.range(n)).offset(d3.stackOffsetExpand),
                layers = stack(data.slice())
            
        var svg = d3.select("svg"),
            width = +svg.node().clientWidth,
            height = +svg.node().clientHeight;

        var x = d3.scaleLinear()
            .domain([0, m-1])
            .range([0, width])

        var y = d3.scaleLinear()
            .domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
            .range([height, 0])
            .clamp(true)

        var z = d3.scaleOrdinal(colors)

        var area = d3.area()
            .x((d, i)=>x(i))
            .y0(d=>y(d[0]))
            .y1(d=>y(d[1]))
            .curve(d3.curveCardinal)

        svg.selectAll("path")
        .data(layers)
        .enter().append("path")
            .classed('stream-path',true)
            .attr("d", area)
            .attr("fill",(d,i)=>z(i));

        function stackMax(layer) {
        return d3.max(layer,d=>d[1]);
        }

        function stackMin(layer) {
        return d3.min(layer,d=>d[0]);
        }

        function transition() {
        data.push(d3.transpose(d3.range(1).map(()=>bumps(m, k))));
        data.shift();
        
        layers = stack(data.slice())
        let stream = d3.selectAll("path")
            .data(layers)
                .transition()
            .ease(d3.easeLinear)
            .duration(duration)
            .attr("d", area);
            
        setTimeout(transition, duration)
        }

        transition();

        // Inspired by Lee Byron’s test data generator.
        function bumps(n, m) {
        var a = [], i;
        for (i = 0; i < n; ++i) a[i] = 0;
        for (i = 0; i < m; ++i) bump(a, n);
        return a;
        }

        function bump(a, n) {
        var x = 1 / (0.1 + Math.random()),
            y = 2 * Math.random() - 0.5,
            z = 10 / (0.1 + Math.random());
        for (var i = 0; i < n; i++) {
            var w = (i / n - y) * z;
            var val = x * Math.exp(-w * w);
            
            let clamped = Math.min(Math.max(val, .1), 15);
            a[i] += clamped
        }
        }
    }
}
</script>

<style>

</style>