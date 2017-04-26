<template>
    <div class="card-wrapper">
        <div class="card z-depth-1" >
            <div class="card-header">
                <h5 class="project-name">{{ project.name }}</h5>
                <span>{{ project.description }}</span>
            </div>
            <div class="img-container">
                <img v-for="(img, index) in project.imgs"  @click="onClick(index)" 
                :class="project.selectedImage === index ? 'active':''" :src="'assets/images/'+img">
            </div>
        </div>
    </div>
</template>

<script>
//<img v-for="img in project.imgs" class="z-depth-1" :src="'assets/images/'+img">
                    
export default {
    name:'project-view',
    props:['project'],//name desc 
    methods:{
        onClick(index){
            this.$emit('selectImage',index)
        }
    }
}
</script>

<style lang="less">

</style>

<style lang="less" scoped>

@import '/assets/custom.less';

.card-wrapper{
    flex:1;
    padding:0px 15px;
    margin-bottom: 10px;
}


.card-wrapper.active{
    .card{
        border: 5px solid @cadetblue;
    }
    img.active{
        border: 3px solid lightgrey;
    }
}

.card{
    border: 5px solid white;
    height:100%;
    padding: 2px 6px;
    background: white;
    cursor: pointer;
    transition: 0.5s;
}

.card-header{
    margin-bottom: 1rem;
    .project-name{
        margin-bottom: 0px;
    }
}

.img-container{
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 10px;
    img{
        max-height:50px;
        width:auto;
        transition: 0.5s;
        border: 3px solid white;
        backface-visibility: hidden;
    }
}

</style>
