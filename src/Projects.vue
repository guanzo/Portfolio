<template>
    <div class="section">
        <h4 class="section-title">Projects</h4>
        <div class="section-subtitle">
            Applications developed for Aviall reside in their private intranet. Here are some screenshots.
        </div>
        <div class="projects-container">
            <div v-for="project in projects" class="card-wrapper">
                <div class=" card z-depth-1">
                    <div class="card-header">
                        <h6>{{ project.name }}</h6>
                        <small>{{ project.description }}</small>
                    </div>
                    <div class="img-container">
                        <img v-for="img in project.imgs" :src="'assets/images/'+img">
                    </div>
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
                    name:'Relevance Engine',
                    description:'News Aggregator',
                    imgs:['re_dashboard.png','re_docspace.png']
                },
                {
                    name:'New Business Generator',
                    description:'Business Intelligence',
                    imgs:['nbg_customer.png','nbg_region.png']
                },
                {
                    name:'Blue Edge',
                    description:'Predictive Analytics',
                    imgs:['be_profile.png','be_scenario.png']
                }
            ]
		}
	},
}
</script>

<style lang="less">

</style>

<style scoped lang="less">
@media (max-width: 550px) {
    .projects-container{
        flex-direction: column;
    }
}

.projects-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0px -15px;
}

.card-wrapper{
    flex:1;
    padding:0px 15px;
}

.card{
    height:100%;
    display: flex;
    flex-direction: column;
    padding: 5px;
}

.card-header{
    margin-bottom: 1rem;
    h6{
        margin-bottom: 0px;
    }
}

.img-container{
    flex:1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    img{
        flex:1;
        margin:2px 4px;
        max-width:100px;
        height:auto;
    }
}

</style>
