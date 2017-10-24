<template>
    <div id="projects" class="app-section">
        <div>
            <v-waypoint :position="'top' "@waypoint="start"></v-waypoint>
            <div class="container">
                <div class="app-section-title">The Gallery</div>
                <dynamic-dialogue class="project-dialogue" :script="script" :startDialogue="startDialogue">
                </dynamic-dialogue>
            </div>
            <project-carousel class="project-list" v-for="project in projects" :project="project" :key="project.name">
            </project-carousel>
        </div>
    </div>
</template>

<script>

import projectCarousel from './projectCarousel'
import dynamicDialogue from '@/components/Dialogue/DialogueDynamic'
import Promise from 'bluebird'
import * as d3 from 'd3'

export default {
    name:'projects',
	data () {
		return {
            gradientIndex: 2,
			projects: this.$store.state.projects,
            startDialogue:false,
            showDelay: 1500,
            script:[
                {speaker:'man', line:"", duration: 1000},
                {speaker:'man', line:"Welcome... to the gallery"},
                {speaker:'man', line:"...", duration: 1000},
                this.fixRotatedPortrait,
                {speaker:'robot', line:"so sorry sire. it won't happen again"},
                {speaker:'man', line:"It happens everytime.."},
                {speaker:'man', line:"Please Guest, feel free to browse around"},
            ],
            
		}
	},
    computed:{
        portraits(){
            return this.projects.map(project=>project.imgs[0])
        },
    },
    mounted(){
        //joke: egg said gallery was ready but the first portrait is fucked up.
        this.$el.querySelector('.frame').classList.add('rotated')
    },
    methods:{
        start(){
           this.startDialogue = true
        },
        onClickProject(index){
            this.$store.commit(SELECT_PROJECT, { index })
        },
        turnLightsOn(){
            return new Promise(resolve => {
                this.lightsOn = true
                
                /*this.$store.commit(CHANGE_PROJECTS_BACKGROUND, { 
                    gradientIndex: this.gradientIndex,
                    gradient: this.gradient 
                })*/

                setTimeout(resolve,this.lightsDuration)
                
            })
        },
        fixRotatedPortrait(){
            return new Promise(resolve => {
                var robot = this.$el.querySelector('.robot-text img')
                var robotBbox = robot.getBoundingClientRect()
                var rotatedPortrait = this.$el.querySelector('.frame.rotated')
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
        },
    },
    components:{
        dynamicDialogue,
        projectCarousel
    }
}

</script>


<style lang="scss">


#projects{
    .speech-bubble{
        box-shadow: 0.2em 0 0 $speech-bg-dark, -0.2em 0 0 $speech-bg-dark;
        background-color: $speech-bg-dark;
    }
}

</style>

<style lang="scss" scoped>


#projects{
    color: #333;
}

.app-section-title,
.project-list{
    transition: 2s;
}

.project-dialogue{
    
}

</style>