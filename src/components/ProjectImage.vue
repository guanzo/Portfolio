<template>
    <div class="section">
        <div class="image-container z-depth-1">
            <transition name="image">
                <img :src="'assets/images/'+project.imgs[project.selectedImage]" :key="project.name+project.selectedImage">
            </transition>
        </div>
    </div>
</template>

<script>
//<img v-for="img in project.imgs" class="z-depth-1" :src="'assets/images/'+img">
                    
export default {
    name:'project-image',
    props:['project']//name desc 
}
</script>

<style lang="less">

</style>

<style lang="less" scoped>

.image-container{
    position: relative;
}

img{
    max-width:100%;
    height:auto;
    position: absolute;
    backface-visibility: hidden;
    top:0;
    left:0;
    &:last-child{
        z-index:-1;
    }
}

.image-enter-active {
  transition: opacity 0.35s ease-in-out;
}
.image-leave-active {
  transition: opacity 0.75s ease-in-out;
}
.image-enter, .image-leave-to {
  opacity: 0;
}
</style>
