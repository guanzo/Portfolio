<template>
    <div class="text-left section">
        <h4>Projects</h4>
        <div class="projects-container">
            <div v-for="project in projects" class="card-wrapper">
                <div class=" card z-depth-1">
                    <h6>{{ project.name }}</h6>
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
                    imgs:['re_dashboard.png','re_docspace.png']
                },
                {
                    name:'New Business Generator',
                    imgs:['nbg_customer.png','nbg_region.png']
                },
                {
                    name:'Blue Edge',
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


.projects-container{
    display: flex;
    justify-content: space-between;
    margin: 0px -15px;
}

.card-wrapper{
    flex:1;
    padding:0px 15px;
}

.card{
    height:100%;
    h6{
        padding:2px 4px;
    }
}

.img-container{
    display: flex;
    align-items: center;
    img{
        flex:1;
        margin:2px 4px;
        max-width:100px;
        height:auto;
    }
}

</style>
