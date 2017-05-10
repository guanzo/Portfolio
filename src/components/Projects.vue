<template>
    <div id="projects" :class="{'lights-off': !lightsOn}">
        <div class="app-section container">
            <v-waypoint @waypoint-in="inHandler"></v-waypoint>
            <dynamic-dialogue :script="script" :startDialogue="startDialogue"></dynamic-dialogue>

            <div class="portraits">
                <div v-for="(project,i) in projects" class="portrait-wrapper">
                    <div class="spotlight">
                        <img class="portrait" ref="portrait" :class="i==0 ? 'rotated':''" :src="'assets/images/projects/'+project.imgs[0]">
                    </div>
                </div>
            </div>
        </div>
        <span class="wip">Work in Progress</span>

        <svg>
            <filter id="lighting" x="-25%" y="-60%" width="150%" height="300%">
                <feGaussianBlur stdDeviation="45" result="blur" />
                <feSpecularLighting specularExponent="40" in="blur" result="light" lighting-color="#bbb">
                    <feSpotLight x="165" y="-50" z="250" limitingConeAngle="35"
                    pointsAtX="150" pointsAtY="30" pointsAtZ="100"/>
                </feSpecularLighting>
                <feComposite in="SourceGraphic" in2="light"
                operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
            </filter>
        </svg>
    </div>
</template>

<script>

import projectSection from './ProjectSection.vue'
import dynamicDialogue from './DialogueDynamic.vue'
import Promise from 'bluebird'
import * as d3 from 'd3'

/**
 * 
 * Skewed portrait is always the first one, so ppl on mobile can see ABR fix it 
 * 
 */

export default {
    name:'projects',
	data () {
		return {
			projects: this.$store.state.projects,
            startDialogue:false,
            lightsOn: false,
            lightsDuration: 4000,
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
        inHandler(){
           setTimeout(()=>this.startDialogue = true,2000)
        },
        turnLightsOn(){
            return new Promise(resolve => {
                this.lightsOn = true
                
                d3.select(this.$el).select('feSpotLight')
                    .attr('pointsAtY','0')
                    .attr('limitingConeAngle','10')
                .transition()
                .duration(this.lightsDuration)
                .delay((d,i)=>i*250)
                    .attr('limitingConeAngle','35')
                    .attr('pointsAtY','30')
                
                d3.select(this.$el).select('feSpecularLighting')
                    .attr('lighting-color','#000')
                .transition()
                .duration(this.lightsDuration)
                    .attr('lighting-color','#bbb')

                setTimeout(resolve,this.lightsDuration)
            })
        },
        fixRotatedPortrait(){
            return new Promise(resolve => {
                var robot = this.$el.querySelector('.robot-text img')
                var robotBbox = robot.getBoundingClientRect()
                var rotatedPortrait = this.$refs.portrait[0]
                var portraitBbox = rotatedPortrait.getBoundingClientRect()

                var x = portraitBbox.left - robotBbox.left
                var y = portraitBbox.top - robotBbox.top
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

.lights-transition(){
    transition: 4s @easeInCubic;
    transition-property: background, opacity;
}

.lights-off{
    &#projects{
        background: #000;
    }
    .portrait, .spotlight{
        opacity: 0;
    }
}

#projects{
    position: relative;
    background: #262626;
    .lights-transition;
}

h3{
    .lights-transition;
}


.portraits{
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    flex-wrap: wrap;
}

.portrait-wrapper{
    display: flex;
    align-items: flex-start;
    justify-content: center;
    max-width:300px;
    padding: 80px 15px 0px 15px;
}

.spotlight{
    filter: url("#lighting");
}

img.portrait{
    filter: drop-shadow(0px 10px 5px black);
    max-width: 100%;
    height:auto;
    opacity: 0.8;
    transition: opacity 4s @easeInCubic 1s, transform 1s @easeOutBack;

    &.rotated{
        transform: rotate(10deg);
    }
}

svg{
    visibility: hidden;
    width:0px;
    height:0px;
    position: absolute;
}
</style>