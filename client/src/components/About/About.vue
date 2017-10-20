<template>
    <div id="about" class="app-section">
        <div class="container">
            <div class="app-section-title scrollfire-appear">The Entrance Hall</div>
            <div class="robot-intro robot-text flow-text">
                    <floating-robot class="scrollfire-to-right" data-scrollfire-delay="1000" />
                    <span class="scrollfire-appear" data-scrollfire-delay="1500">
                        <template v-for="line in robotIntro">
                            <span class="speech-bubble" v-html="line" :key="line"></span>
                            <br>
                        </template>
                    </span>
            </div>
            <div class="section">
                <div class="clearfix">
                    <div class="scrollfire-to-left img-wrapper"  data-scrollfire-delay="1000">
                        <man-portrait />
                        <div>Egg rendition</div>
                    </div>

                    <div class="scrollfire-to-right"  data-scrollfire-delay="1000" >
                        <span>Name</span>
                        <div class="name">Eric Guan</div>
                        <ul class="flow-text">
                            <li>Age: {{ ageInYears }}</li>
                            <li>Gender: Male</li>
                            <li>Height: 5'9"</li>
                            <li>Weight: <span class="alert grey darken-4">REDACTED</span></li>
                            <li>Location: San Diego, California</li>
                            <li>Title: Software Developer</li>
                        </ul>
                    </div>
                </div>
                <links />

                <div class="robot-text flow-text">
                <p class="scrollfire-to-top">
                    As of <b>{{ lastSeenTime }}</b>, Sire was last seen at a Chipotle&trade;.
                    <br>Estimated arrival time: <b>any minute now</b>.
                </p>
                    <div class="sire-found">
                        <p class="scrollfire-to-top">
                            <span class="alert yellow darken-3">ALERT</span>
                            <span>Sire has been located... Sire is behind you.</span>
                        </p>
                        <p class="scrollfire-to-top">
                            <span v-if="candyTaken && !candyOffered">
                                Please present the lollipop.
                                <button @click="onOfferCandy" class="candy-button btn green darken-3">Offer</button>
                            </span>
                            <span v-else></span>
                        </p>
                    </div>
                </div>
                <persistent-dialogue :script="script"></persistent-dialogue>
            </div>
        </div>
    </div>
</template>

<script>
import manPortrait from './ManPortrait'
import links from './Links'
import floatingRobot from './FloatingRobot'
import persistentDialogue from '../DialoguePersistent'
import {mapState} from 'vuex'

export default{
    name:'about',
    data(){
        return {
            gradientIndex:0,
            birthYear: 1991,
            robotIntro:[
                'Welcome Guest, to <b class="raleway">Guanzo manor</b>!',
                "I am the estates caretaker, you may call me <b>Egg</b>",
                "Please excuse the construction, the Sire always has new ideas.",
                "He's not in at the moment. Allow me to make an introduction."
            ],
            script:[
                {speaker:'man', lines:["I'm home! Man they really need to give more rice..", 
                    "Hi there! I hope my robot butler hasn't been too troublesome. Let me s-",]},
                {speaker:'robot', lines:["Welcome home sire!"]},
                {speaker:'man', lines:["Hi Egg.",
                                        "What did I say about interruptions..",
                                        "Also you need to stop giving out my location"]},
                {speaker:'robot', lines:["Yes sire",'my deepest apologies sire']},
                {speaker:'man', lines:["This isn't the first time you've done this","What if someone kidnapped me?"]},
                {speaker:'robot', lines:["Based on your location, the time of day, and mostly your estimated ransom value, there was a 0.054% chance of being abducted. I consi-"]},
                {speaker:'man', lines:["Nevermind"]},
                {speaker:'robot', lines:["Will that be all?"]},
                {speaker:'man', lines:["Prepare the gallery for a showing"]},
                {speaker:'robot', lines:["Yes sire"]},
                {speaker:'man', lines:["Well hello there Guest! Sorry if Egg bothered you, he's an older model..",
                    "Let's get this tour started",
                ]},
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
        }, ...mapState([
            'candyTaken',
            'candyOffered'
        ])
    },
    methods:{
        onOfferCandy(){
            this.script[0].lines.splice(2,0,'Oooo! Thanks for the lollipop. How did you know I liked lollipops?')
            this.$store.commit(OFFER_CANDY)    
        }
    },
    components:{
        floatingRobot,
        persistentDialogue,
        manPortrait,
        links
    }
}

</script>

<style lang="scss" scoped>

#about{
    position: relative;
}

.robot-intro{
    padding-top: 20vh;
    padding-bottom: 20vh;
}

.disclaimer{
    line-height: 2;
}

.name{
    font-size: 2rem;
}

.trademark{
    font-size: 0.75rem;
}

.sire-found{
    margin:50px 0px;
}

.alert{
    padding: 0px 3px;
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



</style>