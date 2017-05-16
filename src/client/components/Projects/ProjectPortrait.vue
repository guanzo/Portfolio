<template>
    <div ref="frame" class="portrait-wrapper frame">
        <img ref="image" class="portrait" :src="'/images/projects/'+project.imgs[0]">
        <div class="overlay">
            <div class="title">{{ project.name }}</div>
            <div class="description">
                <div class="tag"><i class="fa fa-tag"></i>{{ project.tag }}</div>
                <div class="date"><i class="fa fa-calendar"></i>{{ project.startDate }}</div>
            </div>
        </div>
    </div>
</template>

<script>

export default  {
    name:'project-preview',
    props:['project'],
    computed:{
        nameArray(){
            return this.project.name.split(' ')
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
            .description{
                transform: translateY(0);
            }
        }
        .title:before{
            visibility: visible;
            transform: scaleX(1);
        }
    }
}

.overlay, 
.overlay > div {
    transition: .25s;
}

.overlay{
    position: absolute;
    background: rgba(0,0,0,0.5);
    left:0;
    top:0;
    width:100%;
    height:100%;
    padding: 2px 4px;
    text-align: center;
    font-weight: 300;
    opacity:0;
    color: @offwhite;
    overflow: hidden;
    .title{
        font-size: 1.2rem;
        position: relative;
        margin-bottom: 5px;
        &:before{
            content: "";
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: #fff;
            visibility: hidden;
            transform: scaleX(0);
            transition: all 0.3s ease-in-out 0s;
        }
    }
    .description{
        transform: translateY(50%);
    }
    .fa {
        margin-right:5px;
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
    border:solid 3.5vmin #333;
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


/*
.frame-0 {
    background-color:#ddc;
    border:solid 3em #333;

    &:before {
        background: #ecebe9;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.25) inset, 0px 6px .5em rgba(0,0,0,.25) inset;
        bottom: -1.5em;
        left: -1.5em;
        right: -1.5em;
        top: -1.5em;
    }
}*/

/*

.frame-1 {
    background-color:#ddc;
    border:solid 3em #e0b555;
    
    &:before {
        border: 10px solid #e0b555;
        border-image: repeating-linear-gradient( 45deg, #C79830, #9E7316 1%, #896023 1%, #896023 8%) 10;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.25) inset, 0px 6px .5em rgba(0,0,0,.25) inset;
        bottom: -2.5em;
        left: -2.5em;
        right: -2.5em;
        top: -2.5em;
    }
    &:after {
        background: #ffe;
        box-shadow:0 2px 5px 0 rgba(0,0,0,.25) inset, 0px 3px .5em rgba(0,0,0,.25) inset;
        bottom: -1em;
        left: -1em;
        right: -1em;
        top: -1em;
    }
}*/


</style>