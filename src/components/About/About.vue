<template>
    <div id="about">
        <div class="container app-section">
            <div class="robot-intro robot-text flow-text">
                    <floating-robot class="scrollfire-to-right" />
                    <span class="scrollfire-appear">
                        <span class="speech-bubble">Welcome Guest!</span>
                        <br>
                        <span class="speech-bubble">I am the Sire's automated butler robot, or <b>ABR</b> Robot.</span>
                        <br>
                        <span class="speech-bubble">He's not in at the moment. Allow me to make an introduction.</span>
                    </span>
            </div>
            <div class="section">
                <div class="scrollfire-to-left img-wrapper">
                    <man-portrait />
                    <div>ABR rendition</div>
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
                <div class="robot-text flow-text">
                <p class="scrollfire-to-top">
                    As of <b>{{ lastSeenTime }}</b>, Sire was last seen at a Chipotle&trade;.
                    <br>Estimated arrival time: <b>any minute now</b>.
                </p>
                <p class="disclaimer scrollfire-to-top">
                    <span class="alert red darken-3">WARNING</span> 
                    Sire has been known to "get in the zone". Approach with extreme caution.
                    Avoid intermittent interruptions and asking questions that have already been answered.
                    Sire can be temporarily pacified with medium roast coffee, Dr. Pepper<span class="trademark">&reg;</span>,
                    or a red lollipop.
                    Failure to follow these procedures may result in a factory reset.
                </p>
                    <div class="sire-found">
                        <p class="scrollfire-to-top">
                            <span class="alert yellow darken-3">ALERT</span>
                            <span>Sire has been located... Sire is behind you. Please rotate your body.</span>
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
import manPortrait from './ManPortrait.vue'
import {OFFER_CANDY} from '../../store.js'
import floatingRobot from './FloatingRobot.vue'
import persistentDialogue from '../DialoguePersistent.vue'
import {mapState} from 'vuex'

export default{
    name:'about',
    data(){
        return {
            birthYear: 1991,
            script:[
                {speaker:'man', lines:["I'm home! Man they really need to give more rice..", 
                    "Hi there! I hope my robot butler hasn't been too troublesome. Let me s-",]},
                {speaker:'robot', lines:["Welcome home sire!"]},
                {speaker:'man', lines:["*sigh*","What did I say about interruptions..",
                            "Anyways, did the Guest see the intro? The one with the rolling waves of color?"]},
                {speaker:'robot', lines:["Yes sire!"]},
                {speaker:'man', lines:["Well? Did they like it? I spent a lot of time on it, making it work cross browser and such."]},
                {speaker:'robot', lines:["...","I think so sire!"]},
                {speaker:'man', lines:["Good, good","Also, don't give out my location to strangers"]},
                {speaker:'robot', lines:["Yes sire",'my deepest apologies sire']},
                {speaker:'man', lines:["This isn't the first time you've done this","What if someone kidnapped me?"]},
                {speaker:'robot', lines:["Based on your location, the time of day, and mostly your estimated ransom value, there was a 0.054% chance of being abducted. I consi-"]},
                {speaker:'man', lines:["Nevermind"]},
                {speaker:'robot', lines:["Will that be all?"]},
                {speaker:'man', lines:["Prepare my projects gallery for a showing"]},
                {speaker:'robot', lines:["Yes sire"]},
                {speaker:'man', lines:["So sorry about that! He's an older model.. Now let's get going."]},
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
        'floating-robot':floatingRobot,
        'persistent-dialogue':persistentDialogue,
        'man-portrait':manPortrait
    }
}

</script>

<style lang="less" scoped>

#about{
    position: relative;
    padding-bottom: 50px;
}

.robot-intro{
    padding-top: 3rem;
    padding-bottom: 6rem;
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