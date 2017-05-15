<template>
    <div id="projects" class="app-section" :class="{'lights-off': !lightsOn}">
        <div class="container">
            <v-waypoint :position="'top' "@waypoint="start"></v-waypoint>
            <div class="app-section-title">The Gallery</div>
            <sup class="under-construction">under construction</sup>
            
            <div class="gallery-wrapper">
                <div>
                    <dynamic-dialogue :script="script" :startDialogue="startDialogue"></dynamic-dialogue>

                    <div class="portraits">
                        <project-preview @click.native="onClickProject(project)" v-for="(project,i) in projects" ref="frame" :project="project" :class="[i==0 ? 'rotated':'']" >
                        </project-preview>
                    </div>
                </div>
                <transition name="project">
                    <project-view v-if="activeProject" :project="activeProject"></project-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>

import projectView from './ProjectView.vue'
import projectPreview from './ProjectPreview.vue'
import dynamicDialogue from '../DialogueDynamic.vue'
import Promise from 'bluebird'
import * as d3 from 'd3'
import {CHANGE_PROJECTS_BACKGROUND} from '../../store.js'

export default {
    name:'projects',
	data () {
		return {
            gradientIndex: 2,
            gradient:['#fafafa','#fafafa'],//green
			projects: this.$store.state.projects,
            activeProject: null,
            startDialogue:false,
            lightsOn: false,
            lightsDuration: 2000,
            script:[
                {speaker:'man', line:"", duration: 1000},
                {speaker:'man', line:"Lights please, Egg"},
                {speaker:'robot', line: "*clap clap*",duration: 1250},
                this.turnLightsOn,
                {speaker:'man', line:"Welcome... to the gallery"},
                {speaker:'man', line:"...", duration: 1000},
                this.fixRotatedPortrait,
                {speaker:'robot', line:"so sorry sire. it won't happen again"},
                {speaker:'man', line:"It happens everytime.."},
                {speaker:'man', line:"Please Guest, feel free to browse around."},
               ]
		}
	},
    computed:{
        portraits(){
            return this.projects.map(project=>project.imgs[0])
        }
    },
    methods:{
        start(){
           this.startDialogue = true
        },
        onClickProject(project){
            this.activeProject = project;
            //this.script = project.script
        },
        turnLightsOn(){
            return new Promise(resolve => {
                this.lightsOn = true
                
                this.$store.commit(CHANGE_PROJECTS_BACKGROUND, { 
                    gradientIndex: this.gradientIndex,
                    gradient: this.gradient 
                })
                setTimeout(resolve,this.lightsDuration)
            })
        },
        fixRotatedPortrait(){
            return new Promise(resolve => {
                var robot = this.$el.querySelector('.robot-text img')
                var robotBbox = robot.getBoundingClientRect()
                var rotatedPortrait = this.$refs.frame[0].$el
                var portraitBbox = rotatedPortrait.getBoundingClientRect()

                var x = Math.round(portraitBbox.left - robotBbox.left)
                var y = Math.round(portraitBbox.top - robotBbox.top)
                var translate = `translate(${x}px,${y}px)`
                
                d3.select(robot)
                    .transition()
                    .duration(1000)
                    .style('transform',translate)
                    .on('end', function(){
                        rotatedPortrait.classList.remove('rotated')
                    })
                .transition()
                    .duration(1500)
                    .delay(950)
                    .style('transform',null)
                    .on('end',resolve)
            })
        }
    },
    components:{
        'dynamic-dialogue':dynamicDialogue,
        'project-preview':projectPreview,
        'project-view':projectView
    }
}

</script>


<style lang="less">
@import (reference) '/public/less/custom.less';

#projects:not(.lights-off){
    .speech-bubble{
        box-shadow: 0.2em 0 0 @speech-bg-dark, -0.2em 0 0 @speech-bg-dark;
        background-color: @speech-bg-dark;
    }
}

</style>

<style lang="less" scoped>
@import (reference) '/public/less/custom.less';

#projects{
    color: #333;
}

#projects.lights-off{
    color: @offwhite;
    .app-section-title{
        color: #030303;
    }
    .portraits{
        opacity:0
    }
}

.app-section-title,
.portraits{
    transition: 2s;
}

.portraits{
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    flex-wrap: wrap;
}

.gallery-wrapper{
    position: relative;
}

.project-enter-active{
    transition: 1s;
}

.project-enter{
    transform: translateX(100%);
    opacity: 0;
}

</style>