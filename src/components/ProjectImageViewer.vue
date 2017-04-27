<template>
    <div class="project-image-viewer">
        <transition :name="transitionName">
            <div class="transition-wrapper" :key="project.name">
                <div :style="transformStyle" class="carousel" >
                    <div v-for="(img, index) in project.imgs" :key="index" class="image-wrapper">
                        <img :src="'assets/images/projects/'+img"  class="z-depth-1">
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
//<img v-for="img in project.imgs" class="z-depth-1" :src="'assets/images/'+img">
                    
export default {
    name:'project-image-viewer',
    data(){
        return {
            transitionName: 'up'
        }
    },
    computed:{
        project(){
            return this.$store.getters.activeProject
        },
        transformStyle(){
            let index = this.project.selectedImage;
            let amount = 100 * index;
            return {
                transform: `translateX(-${amount}%)`
            }
        }
    },
    watch:{
        project(newProject, oldProject){
            let newIndex = this.$store.state.projects.indexOf(newProject)
            let oldIndex = this.$store.state.projects.indexOf(oldProject)
            
            this.transitionName = newIndex > oldIndex ? 'down' : 'up'
        }
    },
}
</script>

<style lang="less">

</style>

<style lang="less" scoped>

@import '/assets/custom.less';

.project-image-viewer{
    margin: 0px 1rem;
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
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

img{
    max-width:99%;
    height:auto;
    backface-visibility: hidden;
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
