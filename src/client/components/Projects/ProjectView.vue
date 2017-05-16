<template>
    <div class="project-view z-depth-4">
        <x @click.native="onClose" :showDelay="showDelay" class="close"></x>
        <dynamic-dialogue :script="project.script" :startDialogue="startDialogue"></dynamic-dialogue>
        <h4>{{ project.name }}</h4>
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
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: @offwhite;
    padding: 5px;
    color:#333;
}

.close{
    position: absolute;
    top: 5px;
    right: 5px;
    width:25px;
    height:25px;
}

</style>