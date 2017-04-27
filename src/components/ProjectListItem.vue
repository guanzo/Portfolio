<template>
    <div class="card-wrapper">
        <div class="card z-depth-1" >
            <div class="card-header">
                <h5 class="project-name">{{ project.name }}</h5>
                <span>{{ project.description }}</span>
            </div>
            <div class="img-container">
                <img ref="images" v-for="(img, index) in project.imgs"  @click="onClick(index)" 
                :class="project.selectedImage === index ? 'active':''" :src="'assets/images/projects/'+img">
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
    methods:{
        onClick(index){
            if(index !== this.project.selectedImage)
                setTimeout(()=>this.$store.commit({ type: SELECT_IMAGE, index }),0)
                //delaying this commit creates a cool slide effect when transitioning between projects
        }
    }
}
</script>

<style lang="less">

</style>

<style lang="less" scoped>

@import '/assets/custom.less';

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
    height:100%;
    background: white;
    cursor: pointer;
    transition: @projectTransitionSpeed;
    &:hover{
        border-color: @cadetblue;
    }
}

.card-header{
    margin-bottom: 1rem;
    .project-name{
        margin-bottom: 0px;
    }
}

.img-container{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 10px;
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
