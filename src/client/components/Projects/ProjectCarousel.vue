<template>
    <div class="project-view">
        <div ref="portraits" class="portraits-carousel">
            <div class="project-intro">
                <div class="z-depth-2">
                    <h5 class="project-name raleway">{{ project.name }}</h5>
                    <div>{{ project.tag }}</div>
                    <div>{{ project.startDate }}</div>
                    <div class="desc" v-html="project.desc"></div>
                </div>
            </div>
            <project-portrait v-for="(screen,i) in project.screens" :screen="screen" :key="i"></project-portrait>
        </div>
    </div>
</template>

<script>

import dynamicDialogue from '../DialogueDynamic.vue'
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
            cellAlign: 'left',
            freeScroll: true,
            imagesLoaded: true,
            lazyLoad: false,
            contain: true,
        })
    },
    methods:{
        onClose(){
            this.$store.commit(CLOSE_PROJECT)
        }
    },
    components:{
        'dynamic-dialogue':dynamicDialogue,
        'project-portrait':projectPortrait
    }
}

</script>

<style lang="less">

@import (reference) '/public/less/custom.less';

.project-view{
    margin-bottom: 4em;

    &:nth-child(odd){
        color: @offwhite;
        .project-intro > div{
            background: #333;
        }
    }
    &:nth-child(even){
        color: #333;
        .project-intro > div{
            background: @offwhite;
        }
    }
}

.flickity-viewport {
    overflow: visible;
}
</style>

<style lang="less" scoped>
@import (reference) '/public/less/custom.less';

.project-intro{
    margin: 1em; 
    padding: 0em .5em;
    min-width: 200px;
    width:350px;
    max-width: 100%;
    > div{
        padding: .5em 1em;
    }
}

.desc{
    margin-top: 1em;
}


</style>