<template>
    <div class="exhibit">
        <div class="portrait-label z-depth-2">
            {{ screen.desc }}
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
    margin: 1em;    
    display: flex;
    align-items: center;
    //height: 100%;
}

.portrait-label{
    background: #333;
    color: @offwhite;
    margin-right: 1.5em;
    max-width:100px;
    min-width: 75px;
    padding: 1vmin;
}

.img-container{

}

.frame {
    position: relative;
    margin-bottom: .5em;
    width: 350px;
    height: auto;
    cursor: pointer;
    transition: transform 1s @easeOutBack;
    box-shadow:0 0 5px 0 rgba(0,0,0,.25) inset, 0 5px 10px 5px rgba(0,0,0,.25);

    background-color:#333;
    border:solid 2vmin #333;
    border-radius:2px;
    border-bottom-color:#444;
    border-left-color:#333;
    border-right-color:#333;
    border-top-color:#222;
    
    &.rotated{
        transform: rotate(10deg);
    }

    img{
        max-width:100%;
        height:auto;
        display:block;
        border-bottom-color:#443;
        border-left-color:#332;
        border-right-color:#332;
        border-top-color:#110;
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