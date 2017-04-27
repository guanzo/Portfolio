<template>
    <div class="image-container">
        <transition name="image">
            <img :src="'assets/images/'+project.imgs[project.selectedImage]" :key="project.name+project.selectedImage" class="z-depth-1">
        </transition>
    </div>
</template>

<script>
//<img v-for="img in project.imgs" class="z-depth-1" :src="'assets/images/'+img">
                    
export default {
    name:'project-image-viewer',
    created(){
        //console.log(this.project)
    },
    computed:{
        project(){
            return this.$store.getters.activeProject
        }
    },
}
</script>

<style lang="less">

</style>

<style lang="less" scoped>

@import '/assets/custom.less';

.image-container{
    position: relative;
    display: flex;
    padding: 0px 1rem;
}

img{
    max-width:95%;
    height:auto;
    position: absolute;
    backface-visibility: hidden;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    &:last-child{
        z-index:-1;
    }
}
.image-enter-active, .image-leave-active {
  transition: 0.5s ease-in-out;
}
.image-enter, .image-leave-to{
  opacity: 0;
}
</style>
