<template>
    <div ref="frame" class="portrait-wrapper frame">
        <img ref="image" class="portrait" :src="'/images/projects/'+project.imgs[0]">
        <div class="overlay">
            <div class="title raleway">
                <div :style="gradient1" class="line line-top"></div>
                {{ project.name }}
                <div :style="gradient2" class="line line-bot"></div>
            </div>
        </div>
    </div>
</template>

<script>

export default  {
    name:'project-portrait',
    props:['project'],
    computed:{
        gradient1(){
            return {
                background: `linear-gradient(to right, ${this.project.color1},${this.project.color2})`
            }
        },
        gradient2(){
            return {
                background: `linear-gradient(to left, ${this.project.color1},${this.project.color2})`
            }
        }
    },
}

</script>

<style lang="less" scoped>

@import (reference) '/public/less/custom.less';

@easeInCubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
@easeOutBack: cubic-bezier(0.175, 0.885, 0.620, 1.650);

.portrait-wrapper{
    display: flex;
    align-items: flex-start;
    justify-content: center;
    max-width:350px;
    margin: 1em;    
    cursor: pointer;
    transition: transform 1s @easeOutBack;
    box-shadow:0 0 5px 0 rgba(0,0,0,.25) inset, 0 5px 10px 5px rgba(0,0,0,.25);
    &.rotated{
        transform: rotate(10deg);
    }
    &:hover{
        .overlay{
            opacity: 1;
        }
        .title .line{
            visibility: visible;
            &.line-top{ left:0; }
            &.line-bot{ right:0; }
        }
    }
}

.overlay, 
.overlay > div {
    transition: .25s;
}

.overlay{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,0.6);
    left:0;
    top:0;
    width:100%;
    height:100%;
    opacity:0;
    color: @offwhite;
    .title{
        font-size: 1.5rem;
        position: relative;
        line-height: 2;
        .line{
            position: absolute;
            background-color: #fff;
            visibility: hidden;
            transition: 0.5s ease-in-out 0.5s;
            height: 2px;
        }
        .line-bot{
            bottom: 0;
            left: 0;
            right:100%;
        }
        .line-top{
            top: 0;
            right: 0;
            left:100%;
        }
    }    
}

img.portrait{
    max-width: 100%;
    position: relative;
    height:auto;
    transition: opacity 2s @easeInCubic
}

.frame{
    position:relative;
    &:before, &:after{
        content:"";
        position:absolute;
    }
}

.frame {
    background-color:#333;
    border:solid 2vmin #333;
    border-bottom-color:#444;
    border-left-color:#333;
    border-radius:2px;
    border-right-color:#333;
    border-top-color:#222;
    
    img{
        border-bottom-color:#443;
        border-left-color:#332;
        border-right-color:#332;
        border-top-color:#110;
    }

    &:before, &:after{
        border-radius:2px;
    }

    &:before {
        box-shadow:0 2px 5px 0 rgba(0,0,0,.25) inset;
        bottom:-1vmin;
        left:-1vmin;
        right:-1vmin;
        top:-1vmin;
    }
    &:after {
        box-shadow:0 2px 5px 0 rgba(0,0,0,.25);
        bottom:-1.75vmin;
        left:-1.75vmin;
        right:-1.75vmin;
        top:-1.75vmin;
    }
}


</style>