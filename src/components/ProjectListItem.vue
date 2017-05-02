<template>
    <div class="card-wrapper">
        <div class="card z-depth-1" >
            <div class="card-header">
                <div class="project-name">{{ project.name }}</div>
                <span class="project-desc">{{ project.description }}</span>
            </div>
            <div class="img-container">
                <img ref="images" v-for="(img, index) in project.imgs"  @click="onClick(index)" 
                :class="imageIndex === index ? 'active':''" :src="'assets/images/projects/'+img">
            </div>
        </div>
    </div>
</template>

<script>
//<img v-for="img in project.imgs" class="z-depth-1" :src="'assets/images/'+img">
import { SELECT_IMAGE } from '../store.js'

export default {
    name:'project-box',
    props:['project'],//name desc 
    computed:{
        imageIndex(){
            return this.$store.state.selectedImage
        },
    },
    methods:{
        onClick(index){
            if(index !== this.$store.state.selectedImage)
                this.$store.commit({ type: SELECT_IMAGE, index })
                //delaying this commit creates a cool slide effect when transitioning between projects
        }
    }
}
</script>

<style lang="less">

</style>

<style lang="less" scoped>

@import (reference) '/assets/custom.less';

.card-wrapper{
    padding: 5px;
}

.card-wrapper.active{
    .card{
        border: 5px solid @cadetblue-dark;
    }
    img.active{
        border: 3px solid @cadetblue;
    }
}

.card{
    border: 5px solid transparent;
    padding: 5px;
    background: white;
    cursor: pointer;
    transition: @projectTransitionSpeed;
    &:hover{
        border-color: @cadetblue;
    }
}

.card-header{
    padding-bottom: 1rem;
    .project-name{
        font-size: 2rem;
        margin-bottom: 0px;
    }
    .project-desc{
        font-size: 1.5rem;
    }
}

.img-container{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    img{
        border: 3px solid transparent;
        max-height:50px;
        width:auto;
        transition: @projectTransitionSpeed;
        box-shadow: 0px 0px 0px 1px #eee;
        backface-visibility: hidden;
        &:hover{
            border-color: @cadetblue-light;
        }
    }
}

</style>
