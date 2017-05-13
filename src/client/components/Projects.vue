<template>
    <div id="projects" class="app-section" :class="{'lights-off': !lightsOn}">
        <v-waypoint :position="'fill'" @waypoint="waypoint"></v-waypoint>
        <div class="container">
            <v-waypoint :position="'top' "@waypoint="start"></v-waypoint>
            <h2 class="app-section-title scrollfire-to-right">The Gallery</h2>
            <sup class="under-construction">under construction</sup>

            <dynamic-dialogue :script="script" :startDialogue="startDialogue"></dynamic-dialogue>

            <div class="portraits">
                <div v-for="(project,i) in projects" ref="frame" 
                    class="portrait-wrapper frame" :class="[i==0 ? 'rotated':'']" >
                    <img class="portrait" :src="'/images/projects/'+project.imgs[0]">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import projectSection from './ProjectSection.vue'
import dynamicDialogue from './DialogueDynamic.vue'
import Promise from 'bluebird'
import * as d3 from 'd3'
import {CHANGE_PROJECTS_BACKGROUND} from '../store.js'
import waypoint from '../waypoint.js'

export default {
    name:'projects',
    mixins:[waypoint],
	data () {
		return {
            gradientIndex: 2,
            gradient:['#265744','#083023'],//green
			projects: this.$store.state.projects,
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
                {speaker:'robot', line:"so sorry sire"},
                {speaker:'robot', line:"it won't happen again"},
                {speaker:'man', line:"It happens everytime.."},
                {speaker:'man', line:"Please Guest, feel free to browse around.", duration: 4000},
                {speaker:'man', line:"Egg, remind me why I haven't recycled you yet?", duration: 2500},
                {speaker:'robot', line:"I was a gift from your mother"},
                {speaker:'man', line:"Right..."},
                {speaker:'man', line:""},
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
           this.startDialogue = true
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
                var rotatedPortrait = this.$refs.frame[0]
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
        'dynamic-dialogue':dynamicDialogue
    }
}

</script>

<style lang="less" scoped>

@import '/public/less/custom.less';

@easeInCubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
@easeOutBack: cubic-bezier(0.175, 0.885, 0.620, 1.650);

.lights-off{
    .portrait-wrapper{
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
    z-index: 5;
}

.portrait-wrapper{
    display: flex;
    align-items: flex-start;
    justify-content: center;
    max-width:300px;
    margin: 1em;    
    transition: opacity 2s @easeInCubic, transform 1s @easeOutBack;
    box-shadow:0 0 5px 0 rgba(0,0,0,.25) inset, 0 5px 10px 5px rgba(0,0,0,.25);
    &.rotated{
        transform: rotate(10deg);
    }
}

img.portrait{
    max-width: 100%;
    height:auto;
    position: relative;
    z-index: 10;
}

.frame{
    position:relative;
    &:before, &:after{
        content:"";
        position:absolute;
    }
}
/*
.frame-0 {
    background-color:#ddc;
    border:solid 3em #333;

    &:before {
        background: #ecebe9;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.25) inset, 0px 6px .5em rgba(0,0,0,.25) inset;
        bottom: -1.5em;
        left: -1.5em;
        right: -1.5em;
        top: -1.5em;
    }
}*/

.frame {
    background-color:#333;
    border:solid 3.5vmin #333;
    border-bottom-color:#444;
    border-left-color:#333;
    border-radius:2px;
    border-right-color:#333;
    border-top-color:#222;
    
    img{
        border-bottom-color:#443;
        border-left-color:#332;
        border-right-color:#332;
        border-top-color:#110;
    }

    &:before, &:after{
        border-radius:2px;
    }

    &:before {
        box-shadow:0 2px 5px 0 rgba(0,0,0,.25) inset;
        bottom:-1vmin;
        left:-1vmin;
        right:-1vmin;
        top:-1vmin;
    }
    &:after {
        box-shadow:0 2px 5px 0 rgba(0,0,0,.25);
        bottom:-1.75vmin;
        left:-1.75vmin;
        right:-1.75vmin;
        top:-1.75vmin;
    }
}
/*

.frame-1 {
    background-color:#ddc;
    border:solid 3em #e0b555;
    
    &:before {
        border: 10px solid #e0b555;
        border-image: repeating-linear-gradient( 45deg, #C79830, #9E7316 1%, #896023 1%, #896023 8%) 10;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.25) inset, 0px 6px .5em rgba(0,0,0,.25) inset;
        bottom: -2.5em;
        left: -2.5em;
        right: -2.5em;
        top: -2.5em;
    }
    &:after {
        background: #ffe;
        box-shadow:0 2px 5px 0 rgba(0,0,0,.25) inset, 0px 3px .5em rgba(0,0,0,.25) inset;
        bottom: -1em;
        left: -1em;
        right: -1em;
        top: -1em;
    }
}*/

</style>