<template>
    <div class="project-view">
        <div ref="portraits" class="portraits-carousel">
            <div class="project-intro">
                <div class="z-depth-2">
                    <h4>{{ project.name }}</h4>
                    <div>{{ project.tag }}</div>
                    <div>{{ project.startDate }}</div>
                </div>
            </div>
            <project-portrait v-for="(screen,i) in project.screens" :screen="screen" :key="i"></project-portrait>
        </div>
    </div>
</template>

<script>

import dynamicDialogue from '../DialogueDynamic.vue'
import x from './X.vue'
import projectPortrait from './ProjectPortrait.vue'

export default {
    name:'project-view',
    props:['project'],
    data(){
        return {
            theme:{
                background: this.project.background,
                color: this.project.color,
            },
        }
    },
    mounted(){
        var el = this.$refs.portraits
        new Flickity(el,{
            percentPosition: false,
            freeScroll: true,
            imagesLoaded: true,
            lazyLoad: false,
            cellAlign: 'left'
        })
    },
    methods:{
        onClose(){
            this.$store.commit(CLOSE_PROJECT)
        }
    },
    components:{
        'dynamic-dialogue':dynamicDialogue,
        'project-portrait':projectPortrait,
        x
    }
}

</script>

<style>

</style>

<style lang="less" scoped>

@import (reference) '/public/less/custom.less';

.project-view{
    margin-bottom: 4em;

    &:nth-child(odd){
        .project-intro > div{
            color: @offwhite;
            background: #333;
        }
    }
    &:nth-child(even){
        .project-intro > div{
            color: #333;
            background: @offwhite;
        }
    }
}

@height: calc(~'100% - 2em');

.project-intro{
    margin: 1em; 
    padding: 0em .5em;
    height: @height;
    > div{
        padding: .5em 1em;
        height: 100%;
    }
}

.portraits-carousel{

   /* > * {
        margin: 1em; 
    }*/
}


</style>