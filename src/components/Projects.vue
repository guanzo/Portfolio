<template>
    <div id="projects" >
        <div class="container section">
            <h3>Projects</h3>
        </div>
        <template v-for="project in projects" >
            <project-section :project="project"></project-section>
            <div class="project-divider"></div>
        </template>
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

@import '/assets/custom.less';

#projects{
    background: @charcoal;
    color: white;
}

.project-divider{
    height:5px;
}
</style>