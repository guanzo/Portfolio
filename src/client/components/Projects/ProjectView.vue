<template>
    <div class="project-view">
        <x class="close"></x>
        <dynamic-dialogue :script="project.script" :startDialogue="startDialogue"></dynamic-dialogue>
        <h4>{{ project.name }}</h4>
    </div>
</template>

<script>

import dynamicDialogue from '../DialogueDynamic.vue'
import x from './X.vue'
export default {
    name:'project-view',
    props:['project'],
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
        this.startDialogue = true;
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
    will-change: transform;
}

.close{
    position: absolute;
    top: 0;
    right: 0;
    width:25px;
    height:25px;
}

</style>