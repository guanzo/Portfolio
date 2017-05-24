<template>
    <div class="exhibit">
        <div v-if="label" class="portrait-label z-depth-2">
            <div class="title raleway">{{ label.title }}</div>
            <div class="desc">{{ label.desc }}</div>
        </div>
        <div class="img-container">
            <div v-for="img in images" class="frame">
                <img class="portrait" :src="'/images/projects/'+img">
            </div>
        </div>
    </div>
</template>

<script>

export default  {
    name:'project-portrait',
    props:['screen'],
    computed:{
        label(){
            return this.screen.label
        },
        gradient1(){
            return {
                background: `linear-gradient(to right, ${this.project.color1},${this.project.color2})`
            }
        },
        gradient2(){
            return {
                background: `linear-gradient(to left, ${this.project.color1},${this.project.color2})`
            }
        },
        images(){
            if(Array.isArray(this.screen.img))
                return this.screen.img
            else
                return [this.screen.img]
        }
    },
}

</script>

<style lang="less" scoped>

@import (reference) '/public/less/custom.less';

@easeInCubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
@easeOutBack: cubic-bezier(0.175, 0.885, 0.620, 1.650);

.exhibit{
    padding: 1em 3em;    
    display: flex;
    align-items: center;
    //height: 100%;
}

.portrait-label{
    flex:1;
    margin-right: 1.5em;
    min-width: 150px;
    width: 200px;
    max-width: 100%;
    padding: 1vmin;
    .title{
        font-weight: bold;
        font-size: 1.1em;
        margin-bottom: 0.25em;
    }
    .desc{
        font-weight: 300;
    }
}

.img-container{
    width: 350px;
    max-width: 100%;
}

.frame {
    position: relative;
    margin-bottom: .5em;
    height: auto;
    transition: transform 1s @easeOutBack;
    box-shadow:0 0 5px 0 rgba(0,0,0,.25) inset, 0 5px 10px 5px rgba(0,0,0,.25);
    border-style: solid;
    border-width: 2vmin;
    border-radius: 2px;
    
    &.rotated{
        transform: rotate(10deg);
    }

    img{
        max-width:100%;
        height:auto;
        display:block;
    }

    &:before, 
    &:after{
        content:"";
        position:absolute;
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


<style lang="less">

@import (reference) '/public/less/custom.less';

.project-view{
    .portrait-label{
        color: @offwhite;
        background: #333;
    }
    &:nth-child(odd) .frame{
        background-color:#333;
        border-bottom-color:#444;
        border-left-color:#333;
        border-right-color:#333;
        border-top-color:#222;
    }
    &:nth-child(even){
        .portrait-label{
            color: #333;
            background: @offwhite;
        }
        .frame{
            background-color: @offwhite;
            border-bottom-color: #fcfcfc;
            border-left-color: @offwhite;
            border-right-color: @offwhite;
            border-top-color: #e1e1e1;
        }
    }
}
</style>
