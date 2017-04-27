<template>
    <div class="container">
        <project-list></project-list>
        <project-image-viewer class="project-viewer"></project-image-viewer>
    </div>
</template>

<script>
/*

            <p>
                Applications developed for Aviall reside in their private intranet, so they're not publicly available. These 3 projects are single page apps that provide business insights for Aviall.
            </p>
*/
import projectList from './ProjectList.vue'
import projectImageViewer from './projectImageViewer.vue'
import { SELECT_PROJECT } from '../store.js'

export default {
    name:'projects-page',
	data () {
		return {
			projects: this.$store.state.projects
		}
	},
    computed:{
        selectedIndex(){
            return this.$store.state.selectedProject;
        },
    },
    methods:{
        onClick(index){
            this.$store.commit({ type: SELECT_PROJECT, index })
        }
    },
    components:{
        'project-list': projectList,
        'project-image-viewer': projectImageViewer
    }
}
</script>

<style lang="less">

</style>

<style lang="less" scoped>

@import '/assets/custom.less';



.container{
    width:100%;
    max-width: 100%;
    display: flex;
}

.project-viewer{
    width: 75%;
}

.projects-list{
    flex:1;
    display: flex;
    flex-direction: column;
}

@media (max-width: 1000px) {
    .container{
        flex-direction: column;
    }
    .project-viewer{
        width: 100%;
    }
}

</style>
