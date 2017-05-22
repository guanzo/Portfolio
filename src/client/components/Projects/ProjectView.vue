<template>
    <div class="project-view">
        <x @click.native="onClose" :showDelay="showDelay" class="close"></x>
        <dynamic-dialogue :script="project.script" :startDialogue="startDialogue"></dynamic-dialogue>
        <h4>{{ project.name }}</h4>
        <div class="images">
            <img v-for="img in project.imgs" :src="'/images/projects/'+img">
        </div>
    </div>
</template>

<script>

import dynamicDialogue from '../DialogueDynamic.vue'
import x from './X.vue'
import {CLOSE_PROJECT} from '../../store.js'

export default {
    name:'project-view',
    props:['project','showDelay'],
    data(){
        return {
            theme:{
                background: this.project.background,
                color: this.project.color,
            },
            startDialogue: false
        }
    },
    mounted(){
        setTimeout(()=>this.startDialogue = true, this.showDelay)
    },
    methods:{
        onClose(){
            this.$store.commit(CLOSE_PROJECT)
        }
    },
    components:{
        'dynamic-dialogue':dynamicDialogue,
        x
    }
}

</script>

<style lang="less" scoped>

@import (reference) '/public/less/custom.less';

.project-view{
    /*position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;*/
    background: @offwhite;
    padding: 5px;
    color:#333;
}

.images{
    display: flex;
    align-items: flex-start;
    img{
        max-width:350px;
        height:auto;
    }
}

.close{
    position: absolute;
    top: 10px;
    right: 10px;
    width:25px;
    height:25px;
}

</style>