<template>
    <div class="container section">
        <h3 class="section-title">Projects</h3>
        <p>
            Applications developed for Aviall reside in their private intranet, so they're not publicly available. These 3 projects are single page apps that provide business insights for Aviall.
        </p>
        <div class="projects-list">
            <project-preview v-for="(project, index) in projects" @selectImage="setSelectedImage" @click.native="selected = index"
                :project="project" :class="index === selected ? 'active':''" :key="project.name"></project-preview>
        </div>
        <project-image :project="activeProject"></project-image>
    </div>
</template>

<script>
//<img v-for="img in project.imgs" class="z-depth-1" :src="'assets/images/'+img">
import projectPreview from './ProjectPreview.vue'
import projectImage from './ProjectImage.vue'

export default {
    name:'projects-page',
	data () {
		return {
			projects:[
                {
                    name:'Blue Edge',
                    description:'Predictive Analytics',
                    selectedImage:0,
                    imgs:['be_splash.png','be_profile.png','be_scenario.png']
                },
                {
                    name:'New Business Generator',
                    description:'Business Intelligence',
                    selectedImage:0,
                    imgs:['nbg_customer.png','nbg_region.png']
                },
                {
                    name:'Relevance Engine',
                    description:'News Aggregator',
                    selectedImage:0,
                    imgs:['re_dashboard.png','re_docspace.png']
                },
            ],
            selected: 0
		}
	},
    computed:{
        activeProject(){
            return this.projects[this.selected]
        }
    },
    components:{
        'project-preview': projectPreview,
        'project-image': projectImage
    },
    methods:{
        setSelectedImage(index){
            this.activeProject.selectedImage = index;
        }
    }
}
</script>

<style lang="less">

</style>

<style lang="less" scoped>

.projects-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 0px -15px;
}


</style>
