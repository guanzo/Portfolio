<template>
    <div class="container app-section">
        <!--<h2>Me</h2>-->
        <div class="section me">
            <div class="scrollfire-to-left img-wrapper">
                <img src="assets/images/man.svg">
                <div>Artist rendition</div>
            </div>

            <div class="scrollfire-to-right">
                <span>Name</span>
                <div class="name">Eric Guan</div>
                <ul class="flow-text">
                    <li>Age: {{ ageInYears }}</li>
                    <li>Gender: Male</li>
                    <li>Height: 5'9"</li>
                    <li>Weight: <span class="redacted">REDACTED</span></li>
                    <li>Location: Chapel Hill, North Carolina</li>
                    <li>Title: Software Developer</li>
                </ul>
            </div>
            <p class="scrollfire-to-top flow-text">
                Subject was last seen at a Chipotle.
            </p>

            <p class="scrollfire-to-top flow-text">
                <span class="warning red darken-3">WARNING</span> 
                Subject is known to get in the zone. Approach with extreme caution.
                Avoid intermittent interruptions and asking questions that have already been answered.
                Subject can be pacified with coffee or Dr. Pepper<span class="trademark">&reg;</span>.
            </p>
        </div>
        <span class="wip">Work in Progress</span>
    </div>
</template>

<script>

export default{
    name:'about-me',
    data(){
        return {
            birthYear: 1991
        }
    },
    computed:{
        ageInYears(){
            return new Date().getFullYear() - this.birthYear
        }
    }
}

</script>

<style lang="less" scoped>

h2{
    margin-bottom: 3rem;
}

.section{
    //display:  flex;
    //flex-wrap: wrap;
}

.me{

    .name{
        font-size: 2rem;
    }
}

.trademark{
    font-size: 0.75rem;
}

.warning, .redacted{
    padding: 0px 2px;
    border-radius: 4px;
}

.redacted{
    background-color: black;
}

.img-wrapper{
    margin: 0px 0px .5rem .5rem;
    float: right;
    text-align: center;
    width: 25%;
    min-width: 125px;
    img{
        width: 100%;
        min-width:125px;
        height: auto;
        max-height:200px;
    }
}

.wip{
    position: absolute;
    bottom: 0;
	left: 0;
}

</style>