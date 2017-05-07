<template>
    <div id="about">
        <div class="container app-section">
            <p class="robot-greeting robot-text flow-text">
                <floatingRobot class="scrollfire-to-right" />
                <span class="scrollfire-appear">
                    Welcome. I am the Subject's automated greeter robot, or AGR Robot for short.
                    Allow me to introduce you to the Subject.
                </span>
            </p>
            <div class="section">
                <div class="scrollfire-to-left img-wrapper">
                    <man />
                    <div>AGR rendition</div>
                </div>

                <div class="scrollfire-to-right">
                    <span>Name</span>
                    <div class="name">Eric Guan</div>
                    <ul class="flow-text">
                        <li>Age: {{ ageInYears }}</li>
                        <li>Gender: Male</li>
                        <li>Height: 5'9"</li>
                        <li>Weight: <span class="alert black">REDACTED</span></li>
                        <li>Location: Chapel Hill, North Carolina</li>
                        <li>Title: Software Developer</li>
                    </ul>
                </div>
                <p class="scrollfire-to-top robot-text flow-text">
                    As of {{ lastSeenTime }}, Subject was last seen at a Chipotle&trade;.
                </p>

                <p class="scrollfire-to-top robot-text flow-text">
                    <span class="alert red darken-3">WARNING</span> 
                    Subject is known to "get in the zone". Approach with extreme caution.
                    Avoid intermittent interruptions and asking questions that have already been answered.
                    Subject can be temporarily sedated with coffee or Dr. Pepper<span class="trademark">&reg;</span>.
                    Failure to follow these procedures may result in threats of a factory reset.
                </p>

                <p class="robot-text subject-found scrollfire-to-top flow-text">
                    <span class="alert yellow darken-3">ALERT</span>
                    Subject has been located... Subject is behind you. Please present a lollipop as an offeri-
                </p>

                <div class="convo">
                    <p v-for="(line,index) in convo" :class="line.speaker == 'robot' ? 'robot-text':''" class="scrollfire-to-top flow-text">
                        <component v-visible="speakerHasChanged(index)" :is="line.speaker" />
                        <span>{{ line.text }}</span>
                    </p>
                </div>
            </div>
        </div>
        <span class="wip">Work in Progress</span>
    </div>
</template>

<script>

import floatingRobot from './FloatingRobot.vue'

export default{
    name:'about-me',
    data(){
        return {
            birthYear: 1991,
            convo:[
                {speaker:'man', text:"Alright I'm back. Man they really have to give more rice.."},
                {speaker:'man', text:"Hi there! I hope my robot butler hasn't been too troublesome"},
                {speaker:'man', text:"Let me show you around"},
                {speaker:'man', text:"Oh.. and AGR?"},
                {speaker:'robot', text:"Yes?"},
                {speaker:'man', text:"Don't give out my location to strangers"},
                {speaker:'robot', text:"Yes sir"},
            ]
        }
    },
    computed:{
        ageInYears(){
            return new Date().getFullYear() - this.birthYear
        },
        lastSeenTime(){
            var thirtyMin = 1000*60*30
            var date = new Date(new Date().getTime() - thirtyMin)
            return date.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true })
        }
    },
    methods:{
        speakerHasChanged(index){
            if(index == 0)
                return true;
            var lastSpeaker = this.convo[index].speaker;
            var currentSpeaker = this.convo[index-1].speaker;

            return lastSpeaker !== currentSpeaker;
        }
    },
    components:{
        floatingRobot
    }
}

</script>

<style lang="less" scoped>

#about{
    position: relative;
    padding-bottom: 50px;
}

.robot-greeting{
    margin-top: 3rem;
    margin-bottom: 6rem;
}

.robot-text{
    text-transform: uppercase;
}

.name{
    font-size: 2rem;
}

.trademark{
    font-size: 0.75rem;
}

.alert{
    padding: 0px 3px;
    border-radius: 4px;
}

.subject-found{
    margin-top: 75px;
    margin-bottom: 100px;
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

.convo{
    p{
        display: flex;
        align-items: center;
    }   
    img{
        max-width: 50px;
        height:auto;
        margin-right: 10px;
    }
}

.wip{
    position: absolute;
    bottom: 0;
	left: 0;
}

</style>