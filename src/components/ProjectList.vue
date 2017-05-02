<template>
    <div class="projects-list">
        <project-list-item ref="projects" v-for="(project, index) in projects" @click.native.capture="onClick(index)"
            :project="project" :class="index === selectedProjectIndex ? 'active':''" :key="project.name"></project-list-item>
        
    </div>
</template>

<script>
/*

<p>
    Applications developed for Aviall reside in their private intranet, so they're not publicly available. These 3 projects are single page apps that provide business insights for Aviall.
</p>
*/
import projectListItem from './ProjectListItem.vue'
import { SELECT_PROJECT } from '../store.js'

export default {
    name:'projects-list',
	data () {
		return {
			projects: this.$store.state.projects
		}
	},
    computed:{
        selectedProjectIndex(){
            return this.$store.state.selectedProject;
        },
        activeProject(){
            return this.$store.getters.activeProject
        },
    },
    methods:{
        onClick(index){
            if(index !== this.selectedProjectIndex)
                this.$store.commit({ type: SELECT_PROJECT, index })
        },
    },
    components:{
        'project-list-item': projectListItem
    }
}
</script>


<style lang="less" scoped>


.projects-list{
    flex:1;
    display: flex;
    position: relative;
    position: fixed;
    bottom: 5px;
}

</style>
