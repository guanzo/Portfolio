<template>
    <div class="project-image-viewer">
        <transition :name="transitionDirection">
            <img :src="'assets/images/projects/'+activeImage"  class="z-depth-1" :key="imageIndex">
            <!--<div class="transition-wrapper" :key="project.name">
                <div :style="transformStyle" class="carousel" >
                    <div v-for="(img, index) in project.imgs" :key="index" class="image-wrapper">
                        <img :src="'assets/images/projects/'+img"  class="z-depth-1">
                    </div>
                </div>
            </div>-->
        </transition>
    </div>
</template>

<script>
//<img v-for="img in project.imgs" class="z-depth-1" :src="'assets/images/'+img">
import debounce from 'lodash/debounce'

export default {
    name:'project-image-viewer',
    data(){
        return {
            transitionDirection: 'left'
        }
    },
    computed:{
        imageIndex(){
            return this.$store.state.selectedImage
        },
        activeImage(){
            return this.project.imgs[this.imageIndex]
        },
        project(){
            return this.$store.getters.activeProject
        },
        totalImageIndex(){
            let projects = this.$store.state.projects;
            let index = projects.indexOf(this.project)
            let totalIndex = 0;
            for(let i=0; i<index; i++){
                totalIndex += projects[i].imgs.length;
                console.log('totalIndex ' + totalIndex)
                console.log(projects[i])
            }
            totalIndex += this.imageIndex;
                console.log('image index: ' + this.imageIndex)
                console.log('totalIndex ' + totalIndex)
            console.log('----------------')
            return totalIndex;
        }
    },
    watch:{
        /*project(newProject, oldProject){
            let newIndex = this.$store.state.projects.indexOf(newProject)
            let oldIndex = this.$store.state.projects.indexOf(oldProject)
            
            this.transitionDirection = newIndex > oldIndex ? 'left' : 'right'
        },
        imageIndex(newIndex, oldIndex){
            this.transitionDirection = newIndex > oldIndex ? 'left' : 'right'
        },*/
        totalImageIndex(newIndex, oldIndex){
            this.transitionDirection = newIndex > oldIndex ? 'left' : 'right'
            console.log(arguments)
        }
    },
}
</script>

<style lang="less">

</style>

<style lang="less" scoped>

@import (reference) '/assets/custom.less';

.project-image-viewer{
    margin-top: 5px;
    overflow: hidden;
    position: relative;
}

.carousel{
    transition: @projectTransitionSpeed;
    display: flex;
    will-change: transform;
}

.transition-wrapper{
    transition: @projectTransitionSpeed;
}

.image-wrapper{
    flex: 1;
    min-width:100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

img{
    max-width:99%;
    height:auto;
    backface-visibility: hidden;
    transition: @projectTransitionSpeed;
    display: block;
    margin: 0 auto;
}

.left-leave-to, .right-enter{
    transform: translateX(-100%);
}
.left-enter, .right-leave-to {
    transform: translateX(100%);
}

.left-leave-to, .right-leave-to {
    position: absolute;
    opacity:0;
}

.left-enter, .right-enter, {
    opacity:0;
}

.up-leave-to, .down-enter{
    transform: translateY(100%);
}
.up-enter, .down-leave-to {
    transform: translateY(-100%);
}

.up-leave-to, .down-leave-to {
    position: absolute;
    opacity:0;
}

.up-enter, .down-enter, {
    opacity:0;
}
</style>
