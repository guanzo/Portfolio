<template>
    <div id="projects">
        <div class="app-section container">
            <h3>Projects</h3>
        </div>
        <span class="wip">Work in Progress</span>
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
    position: relative;
}

.project-divider{
    height:5px;
}
</style>