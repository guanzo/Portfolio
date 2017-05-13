<template>
    <div>
        HELLO
    </div>
</template>

<script>
import Vue from 'vue'
export default {
	data () {
		return {
            links: [
                {
                    name:'Home',
                    url: '#home',
                },
                {
                    name:'Technologies',
                    url: '#technologies',
                },
                {
                    name:'Projects',
                    url: '#projects',
                },
            ]
		}
	},
    created(){
        //smoothScroll.polyfill();
    },
    methods:{
        /*onClick(e){
            e.preventDefault();
            var anchor = e.currentTarget.getAttribute('href')
            var node = document.querySelector(anchor);
            var top = node.offsetTop - 64;
            window.scroll({ top , behavior: 'smooth' });
        }*/
    }
}
</script>

<style lang="less">
</style>

<style lang="less" scoped>

@import (reference) '/public/less/custom.less';

nav{
    background: @primary;
    background: linear-gradient(to right, @primary, @purple);
    opacity: .95;
}
.fa {
    display: inherit !important;
 }
.external{
    a:hover{
        background-color: inherit;
    }
    .fa{
        transition: 0.35s;
        &:hover{
            color: @primary-light;
        }
    }
}
</style>
