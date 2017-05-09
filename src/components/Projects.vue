<template>
    <div id="projects" :class="{'lights-off': !lightsOn}">
        <div class="app-section container">
            <v-waypoint @waypoint-in="inHandler"></v-waypoint>
            <h3>Projects</h3>
            <dynamic-dialogue :script="script" v-if="startDialogue"></dynamic-dialogue>
        </div>
        <span class="wip">Work in Progress</span>
    </div>
</template>

<script>

import projectSection from './ProjectSection.vue'
import dynamicDialogue from './DialogueDynamic.vue'
import Promise from 'bluebird'

export default {
    name:'projects',
	data () {
		return {
			projects: this.$store.state.projects,
            startDialogue:false,
            lightsOn: false,
            script:[
                {speaker:'man', line:"Lights please, ABR", delay: 1000},
                {speaker:'robot', line: "Lights on!"},
                this.turnLightsOn,
                {speaker:'man', line:"Welcome... to the galleria"},
               ]
		}
	},
    methods:{
        inHandler(){
           this.startDialogue = true
        },
        turnLightsOn(){
            return new Promise((resolve,reject)=>{
                console.log('turning lights on in 2 seconds')

                setTimeout(()=>{
                    this.lightsOn = true
                    console.log('lights turned on')
                    resolve();
                },2000)
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

.lights-transition(){
    transition: 3s;
}

#projects{
    position: relative;
    background: @charcoal;
    .lights-transition;
}

h3{
    .lights-transition;
}

.lights-off{
    &#projects{
        background:#0F0F0F
    }
    h3{
        opacity: 0;
    }
}

.project-divider{
    height:5px;
}
</style>