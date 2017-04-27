<template>
    <div class="projects-list">
        <project-box ref="projects" v-for="(project, index) in projects" @click.native.capture="onClick(index)"
            :project="project" :class="index === selectedIndex ? 'active':''" :key="project.name"></project-box>
        
    </div>
</template>

<script>
/*

<p>
    Applications developed for Aviall reside in their private intranet, so they're not publicly available. These 3 projects are single page apps that provide business insights for Aviall.
</p>
*/
import projectBox from './ProjectBox.vue'
import { SELECT_PROJECT } from '../store.js'

export default {
    name:'projects-list',
	data () {
		return {
			projects: this.$store.state.projects
		}
	},
    computed:{
        selectedIndex(){
            return this.$store.state.selectedProject;
        },
        activeProject(){
            return this.$store.getters.activeProject
        },
    },
    methods:{
        onClick(index){
            this.$store.commit({ type: SELECT_PROJECT, index })
        },
    },
    components:{
        'project-box': projectBox
    }
}
</script>

<style lang="less">

</style>

<style lang="less" scoped>

@import '/assets/custom.less';


.projects-list{
    flex:1;
    display: flex;
    flex-direction: column;
    position: relative;
}

</style>
