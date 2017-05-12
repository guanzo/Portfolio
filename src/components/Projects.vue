<template>
    <div id="projects" class="app-section" :class="{'lights-off': !lightsOn}">
        <v-waypoint :position="'fill'" @waypoint="waypoint"></v-waypoint>
        <v-waypoint @waypoint="start"></v-waypoint>
        <div class="container">
            <h2 class="app-section-title scrollfire-to-right">The Galleria</h2>
            <dynamic-dialogue :script="script" :startDialogue="startDialogue"></dynamic-dialogue>

            <div class="portraits">
                <div v-for="(project,i) in projects" class="portrait-wrapper">
                    <img class="portrait" ref="portrait" :class="i==0 ? 'rotated':''" :src="'assets/images/projects/'+project.imgs[0]">
                </div>
            </div>
        </div>
        <span class="wip">Work in Progress</span>
    </div>
</template>

<script>

import projectSection from './ProjectSection.vue'
import dynamicDialogue from './DialogueDynamic.vue'
import Promise from 'bluebird'
import * as d3 from 'd3'
import {CHANGE_PROJECTS_BACKGROUND} from '../store.js'
import waypoint from '../waypoint.js'

/**
 * Skewed portrait is always the first one, so ppl on mobile can see ABR fix it 
 */

export default {
    name:'projects',
    mixins:[waypoint],
	data () {
		return {
            gradientIndex: 2,
            gradient:['#224e4d ','#083023 '],//green
			projects: this.$store.state.projects,
            startDialogue:false,
            lightsOn: false,
            lightsDuration: 2000,
            script:[
                {speaker:'man', line:"Lights please, ABR"},
                {speaker:'robot', line: "*clap clap*",duration: 1250},
                this.turnLightsOn,
                {speaker:'man', line:"Welcome... to the galleria"},
                {speaker:'man', line:"..."},
                this.fixRotatedPortrait,
                {speaker:'robot', line:"so sorry sire"},
               ]
		}
	},
    computed:{
        portraits(){
            return this.projects.map(project=>project.imgs[0])
        },
    },
    methods:{
        start(){
           setTimeout(()=>this.startDialogue = true,2000)
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
                var rotatedPortrait = this.$refs.portrait[0]
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
                    .delay(1000)
                    .style('transform',null)
                    .on('end',resolve)
            })
        }
    },
    components:{
        'dynamic-dialogue':dynamicDialogue
    }
}

</script>

<style lang="less" scoped>

@import '/assets/custom.less';

@easeInCubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
@easeOutBack: cubic-bezier(0.175, 0.885, 0.620, 1.650);

.lights-off{
    .portrait{
        opacity: 0;
    }
}

#projects{
    position: relative;
}

.portraits{
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    flex-wrap: wrap;
    position: relative;
    z-index: 10;
}

.portrait-wrapper{
    display: flex;
    align-items: flex-start;
    justify-content: center;
    max-width:300px;
    margin: 1em;    
    box-shadow: 0px 0px 15px white;
}

img.portrait{
    max-width: 100%;
    height:auto;
    transition: opacity 1.5s @easeInCubic, transform 1s @easeOutBack;
    &.rotated{
        transform: rotate(10deg);
    }
}

</style>