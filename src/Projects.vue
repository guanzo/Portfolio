<template>
    <div class="section">
        <h3 class="section-title">Projects</h3>
        <p>
            Applications developed for Aviall reside in their private intranet, so they're not publicly available. These 3 projects are single page apps that provide business insights for Aviall.
        </p>
        <div class="projects-container">
            <div v-for="project in projects" class="card-wrapper">
                <div class="card">
                    <div class="card-header">
                        <h5 class="project-name">{{ project.name }}</h5>
                        <span>{{ project.description }}</span>
                    </div>
                    <img v-for="img in project.imgs" class="z-depth-1" :src="'assets/images/'+img">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
	data () {
		return {
			projects:[
                {
                    name:'Blue Edge',
                    description:'Predictive Analytics',
                    imgs:['be_profile.png','be_scenario.png']
                },
                {
                    name:'New Business Generator',
                    description:'Business Intelligence',
                    imgs:['nbg_customer.png','nbg_region.png']
                },
                {
                    name:'Relevance Engine',
                    description:'News Aggregator - stay informed in the aviation industry',
                    imgs:['re_dashboard.png','re_docspace.png']
                },
            ]
		}
	},
}
</script>

<style lang="less">

</style>

<style lang="less" scoped>

.projects-container{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0px -15px;
}

.card-wrapper{
    flex:1;
    padding:15px 15px;
    margin:10px 0px;
}

.card{
    height:100%;
    display: flex;
    flex-direction: column;
    align-items: left;
}

.card-header{
    margin-bottom: 1rem;
    position: sticky;
    top: 5px;
    .project-name{
        margin-bottom: 0px;
    }
}

img{
    margin:2px 4px;
    max-width:100%;
    height:auto;
    margin:10px 0px;
}


</style>
