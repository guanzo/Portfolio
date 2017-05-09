<template>
    <div id="projects">
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
            return new Promise(function(resolve,reject){
                console.log('turning lights on in 2 seconds')

                setTimeout(()=>{
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

#projects{
    position: relative;
}

.project-divider{
    height:5px;
}
</style>