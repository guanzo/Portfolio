<template>
    <div id="projects"  class="container section">
        <h3>Projects</h3>
        <project-section v-for="project in projects" :project="project"></project-section>
    </div>
</template>

<script>

import projectSection from './ProjectSection.vue'

export default {
    name:'projects-section',
	data () {
		return {
			projects: this.$store.state.projects
		}
	},
    components:{
        'project-section':projectSection
    }
}

</script>

<style lang="less" scoped>

</style>